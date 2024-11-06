const inquirer = require('inquirer');
const { eachLimit } = require('async');
const fetch = require('node-fetch');

const batch = require('./batch');
const { readCsv, writeCsv } = require('./csv');
const { isDev } = require('./env');
const isEmailValid = require('./validate');

const { log } = console;
const limit = 2;

const getApiUrl = (site) => {
  if (isDev) return `http://www-smg-${site.toLowerCase()}.dev.parameter1.com/api/identity-x`;
  const host = site.toLowerCase() === 'am' ? 'auntminnie' : 'drbicuspid';
  return `https://www.${host}.com/api/identity-x`;
};

/**
 * @param {object} o
 * @param {string} o.file
 * @param {string} o.list
 * @param {("AM"|"DRB")} o.site
 */
module.exports = async ({ list, file, site }) => {
  const toUpsert = await readCsv(`./data/${file}`);
  const newSet = new Set(toUpsert.map(({ email }) => `${email}`.trim().toLowerCase()));
  log(`${site}: Loaded ${toUpsert.length} records (${newSet.size} unique) from data file "data/${file}".`);

  const listMembers = await readCsv(`./data/segments/${list.segmentId}.csv`);
  const oldSet = new Set(listMembers.map(({ email }) => `${email}`.toLowerCase()));
  log(`${site}: Loaded ${listMembers.length} records (${oldSet.size} unique) from reference file "segments/${list.segmentId}.csv".`);

  const [invalid, valid] = [...newSet].reduce(([inv, val], email) => {
    const target = isEmailValid(email) ? val : inv;
    target.add(email);
    return [inv, val];
  }, [new Set(), new Set()]);

  log(`${site}: Found ${invalid.size} invalid emails in data file!`);
  const difference = new Set([...valid].filter((v) => !oldSet.has(v)));
  log(`${site}: Found ${difference.size} unique new emails to process for "${list.name}".`);
  const union = new Set([...valid].filter((v) => oldSet.has(v)));
  log(`${site}: Found ${union.size} unique existing emails to process for "${list.name}".`);

  await writeCsv(`./data/reports/${list.segmentId}.insert.csv`, [{ id: 'email', title: 'email' }], [...difference].map((email) => ({ email })));
  await writeCsv(`./data/reports/${list.segmentId}.invalid.csv`, [{ id: 'email', title: 'email' }], [...invalid].map((email) => ({ email })));
  await writeCsv(`./data/reports/${list.segmentId}.update.csv`, [{ id: 'email', title: 'email' }], [...union].map((email) => ({ email })));

  const { continue: go } = await inquirer.prompt([{
    name: 'continue',
    type: 'confirm',
    message: 'Would you like to continue?',
  }]);

  if (!go) return process.exit(1);

  const toProcess = toUpsert.map((doc) => ({ ...doc, email: `${doc.email}`.trim().toLowerCase() })).filter(({ email }) => valid.has(email));

  await batch({
    name: 'upsert',
    limit,
    handler: async ({ results }) => new Promise((resolve, reject) => {
      eachLimit(results, Math.floor(limit / 2), async (doc) => {
        const payload = {
          email: doc.email,
          givenName: doc['first name'],
          familyName: doc['last name'],
          organization: doc.company,
          organizationTitle: doc['job title'],
          subscriptions: { [list.subscriptionGroupId]: true },
          brazeCustomAttributes: { outside_source: file },
        };
        const res = await fetch(getApiUrl(site), {
          body: JSON.stringify(payload),
          headers: { 'content-type': 'application/json' },
          method: 'POST',
        });
        if (!res.ok) {
          log(await res.json());
          throw new Error(`Invalid API response, ${res.status} ${res.statusText}`);
        }
        console.log(res);
        // log('handle', doc);
      }, (err) => {
        if (err) reject(err);
        resolve();
      });
    }),
    retriever: ({ skip }) => toProcess.slice(skip, skip + limit),
    totalCount: toProcess.length,
  });

  return log('Done!');
};

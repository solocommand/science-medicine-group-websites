const inquirer = require('inquirer');
const { eachLimit } = require('async');
const fetch = require('node-fetch');
const pRetry = require('p-retry');
const { createHash } = require('node:crypto');
const { mkdir, writeFile } = require('node:fs/promises');

const batch = require('./batch');
const { readCsv, writeCsv } = require('./csv');
const {
  isDev,
  IDENTITYX_API_KEY_AM,
  IDENTITYX_API_KEY_DRB,
} = require('./env');
const isEmailValid = require('./validate');

const { log } = console;
const limit = 25;

const getApiUrl = (site) => {
  if (isDev) return `http://www-smg-${site.toLowerCase()}.dev.parameter1.com/api/identity-x`;
  const host = site.toLowerCase() === 'am' ? 'auntminnie' : 'drbicuspid';
  return `https://www.${host}.com/api/identity-x`;
};

const completeRecord = async (email, prefix, processed) => {
  processed.push({ email });
  await writeCsv(`${prefix}/processed.csv`, [{ id: 'email', title: 'email' }], processed);
};

const failRecord = async (email, prefix, message) => {
  try {
    const failed = await readCsv(`${prefix}/failed.csv`);
    failed.push({ email, message });
    await writeCsv(`${prefix}/failed.csv`, [{ id: 'email', title: 'email' }, { id: 'message', title: 'message' }], failed, true);
  } catch (e) {
    await writeFile(`${prefix}/failed.csv`, `email,message\n"${email}","${message}"\n`);
  }
};

/**
 * @param {object} o
 * @param {string} o.file
 * @param {string} o.list
 * @param {("AM"|"DRB")} o.site
 */
module.exports = async ({ list, file, site }) => {
  const hash = createHash('md5').update(file).digest('hex');
  const prefix = `./data/reports/${list.segmentId}/${hash}`;
  await mkdir(prefix, { recursive: true });

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

  await writeCsv(`${prefix}/insert.csv`, [{ id: 'email', title: 'email' }], [...difference].map((email) => ({ email })));
  await writeCsv(`${prefix}/invalid.csv`, [{ id: 'email', title: 'email' }], [...invalid].map((email) => ({ email })));
  await writeCsv(`${prefix}/update.csv`, [{ id: 'email', title: 'email' }], [...union].map((email) => ({ email })));

  let toSkip = [];
  try {
    toSkip = await readCsv(`${prefix}/processed.csv`);
    toSkip.forEach(({ email }) => valid.delete(email));
    log(`${site}: Skipping ${toSkip.length} previously processed records!`);
  } catch (e) {
    await writeFile(`${prefix}/processed.csv`, 'email\n');
  }

  log(`Import mode: ${isDev ? 'development' : 'production'}`);
  const { continue: go } = await inquirer.prompt([{
    name: 'continue',
    type: 'confirm',
    message: 'Would you like to continue?',
  }]);

  if (!go) return process.exit(1);

  const apiKey = site === 'AM' ? IDENTITYX_API_KEY_AM : IDENTITYX_API_KEY_DRB;

  const toProcess = toUpsert.map((doc) => ({ ...doc, email: `${doc.email}`.trim().toLowerCase() })).filter(({ email }) => valid.has(email));

  await batch({
    name: 'upsert',
    limit,
    handler: async ({ results }) => new Promise((resolve, reject) => {
      eachLimit(results, 5, async (doc) => {
        const payload = {
          email: doc.email,
          givenName: doc['first name'],
          familyName: doc['last name'],
          organization: doc.company,
          organizationTitle: doc['job title'],
          subscriptions: { [list.subscriptionGroupId]: true },
          brazeCustomAttributes: { outside_source: file },
        };

        try {
          await pRetry(async () => {
            const res = await fetch(getApiUrl(site), {
              body: JSON.stringify(payload),
              headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${apiKey}`,
              },
              method: 'POST',
            });
            if (!res.ok) {
              let msg = `${res.status} ${res.statusText}`;
              try {
                const { error: { message } } = await res.json();
                msg = `${msg}: ${message}`;
              } catch (e) {
                // noop
              }
              throw new Error(`Invalid API response, ${msg}`);
            }
            await completeRecord(doc.email, prefix, toSkip);
          }, {
            retries: 3,
            // onFailedAttempt: (err) => log(`Upsert ${doc.email} #${er
            // r.attemptNumber}/3 failed: ${err.message}, retrying!`),
          });
        } catch (e) {
          await failRecord(doc.email, prefix, e.message);
        }
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

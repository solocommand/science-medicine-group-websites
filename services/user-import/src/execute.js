const inquirer = require('inquirer');

const batch = require('./batch');
const { readCsv, writeCsv } = require('./csv');
const isEmailValid = require('./validate');

const { log } = console;
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

  await batch({
    name: 'upsert',
    limit: 2,
    handler: async ({ results }) => {
      log('upserting', { results });
    },
    retriever: ({ limit, skip }) => toUpsert.slice(skip, skip + limit),
    totalCount: toUpsert.length,
  });

  return log('Done!');
};

const inquirer = require('inquirer');
const batch = require('./batch');
const readCsv = require('./read-csv');

const { log } = console;

/**
 * @param {object} o
 * @param {string} o.file
 * @param {string} o.list
 * @param {("AM"|"DRB")} o.site
 */
module.exports = async ({ list, file, site }) => {
  const toUpsert = await readCsv(`./data/${file}`);
  const newSet = new Set(toUpsert.map(({ email }) => `${email}`.toLocaleLowerCase()));
  log(`${site}: Loaded ${toUpsert.length} records (${newSet.size} unique) from data file data/${file}.`);

  const listMembers = await readCsv(`./data/segments/${list.segmentId}.csv`);
  const oldSet = new Set(listMembers.map(({ email }) => `${email}`.toLocaleLowerCase()));
  log(`${site}: Loaded ${listMembers.length} records (${oldSet.size} unique) from reference file segments/${list.segmentId}.csv.`);

  const difference = new Set([...newSet].filter((v) => !oldSet.has(v)));
  log(`${site}: Found ${difference.size} unique emails to process for ${list.name}!`);

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

const batch = require('./batch');
const { diffIdx, diffList } = require('./diff');
const { fetchIdxMembers, fetchListMembership } = require('./fetch');
const readCsv = require('./read-csv');

const { log } = console;

const upsertResults = async ({ results }) => {
  log('upserting', { results });
};

/**
 * @param {object} o
 * @param {string} o.file
 * @param {string} o.list
 * @param {("AM"|"DRB")} o.site
 */
module.exports = async ({ list, file, site }) => {
  const toUpsert = await readCsv(`./data/${file}`);

  const listMembers = await fetchListMembership({
    list,
    overwrite: false,
    site,
    suffix: 'pre',
  });
  const idxMembers = await fetchIdxMembers({
    list,
    overwrite: false,
    site,
    suffix: 'pre',
  });

  await batch({
    name: 'upsert',
    limit: 2,
    handler: upsertResults,
    retriever: ({ limit, skip }) => toUpsert.slice(skip, skip + limit),
    totalCount: toUpsert.length,
  });

  const listMembers2 = await fetchListMembership({ site, list, suffix: 'post' });
  const idxMembers2 = await fetchIdxMembers({ site, list, suffix: 'post' });

  await diffList({ old: listMembers, new: listMembers2, list });
  await diffIdx({ old: idxMembers, new: idxMembers2, site });
};

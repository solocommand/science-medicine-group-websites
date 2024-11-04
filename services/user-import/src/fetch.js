const { log } = console;

const fetchIdxMembers = ({
  list,
  site,
  suffix = 'pre',
  overwrite = true,
} = {}) => {
  log('fetching idx membership', { site, list, suffix });
  return [];
};

const fetchListMembership = async ({
  list,
  site,
  suffix = 'pre',
  overwrite = true,
} = {}) => {
  log('fetching list membership', { site, list, suffix });
  return [];
};

module.exports = {
  fetchIdxMembers,
  fetchListMembership,
};

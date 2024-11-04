const { log } = console;

const diffList = ({
  old, new: newData, list,
}) => {
  log('diffing list', old, newData, list);
};

const diffIdx = ({
  old, new: newData, site,
}) => {
  log('diffing site', old, newData, site);
};

module.exports = {
  diffIdx,
  diffList,
};

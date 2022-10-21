const { getAsObject } = require('@parameter1/base-cms-object-path');

module.exports = {
  filterByExternalId: (arr, type, tenant) => arr.filter((v) => {
    const ns = getAsObject(v, 'field.externalId.namespace');
    return ns.provider === 'braze' && ns.type === type && ns.tenant === tenant;
  }),
  getFormatter: v => (typeof v === 'function' ? v : x => x.payload),
};

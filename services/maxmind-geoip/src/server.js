const { server } = require('@parameter1/micro/json');
// const { createError } = require('@parameter1/micro');
const { name } = require('../package.json');

const { log } = console;

module.exports = server({
  name,
  actions: {
    ping: async () => 'pong',
    country: async (params = {}, { context, meta }) => {
      log('country', params);
      log(context, meta);
      return {};
    },
  },
  limit: '10mb',
  logErrors: ({ status }) => (status >= 500),
  context: ({ req }) => {
    log('building context', req.ip);
    return {};
    // const tenantKey = req.headers['x-tenant-key'];
    // const siteKey = req.headers['x-site-key'];
    // if (!tenantKey) throw createError(400, 'You must provide a tenant context
    //  via the `x-tenant-key` header.');
    // const basedb = basedbFactory(tenantKey);
    // return { basedb, tenantKey, siteKey };
  },
});

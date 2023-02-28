const { server } = require('@parameter1/micro/json');
const { createError } = require('@parameter1/micro');
const { name } = require('../package.json');
const client = require('./client');

module.exports = server({
  name,
  actions: {
    ping: async () => 'pong',
    // eslint-disable-next-line default-param-last
    country: async (params = {}, { context }) => {
      if (!params.ip) throw createError(400, 'You must provide an ip address');
      return context.client.country(params.ip);
    },
  },
  limit: '10mb',
  logErrors: ({ status }) => (status >= 500),
  context: () => ({ client }),
});

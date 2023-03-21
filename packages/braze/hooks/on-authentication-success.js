const debug = require('debug')('braze');
const { buildPayload } = require('../utils');

/**
 *
 */
module.exports = async ({
  brazeConfig,
  user,
  service,
}) => {
  const { req } = service;
  const { braze } = req;

  const payload = buildPayload({
    brazeConfig,
    user,
    payload: {
      ...(user.verified && { verification_source: 'Auth0' }),
    },
  });
  await braze.trackUser(user.email, user.id, payload);
};

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

  if (user.verified) {
    // Opt the user out of the 'unconfirmed' group
    await braze.confirmUser(user.email, user.id, 'identity-x');
  } else {
    await braze.unconfirmUser(user.email, user.id);
  }

  const payload = buildPayload({
    brazeConfig,
    user,
    payload: {
      ...(user.verified && { verification_source: 'Auth0' }),
    },
  });
  await braze.trackUser(user.email, user.id, payload);
};

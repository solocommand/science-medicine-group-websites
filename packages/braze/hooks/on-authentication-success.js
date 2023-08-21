const { buildPayload } = require('../utils');

/**
 * @typedef {import('@parameter1/base-cms-marko-web-identity-x/service')} IdentityXService
 * @typedef {import('../service')} BrazeService
 * @typedef {import('../index').BrazeConfig} BrazeConfig
 *
 * @typedef BrazeRequest
 * @prop {BrazeService} braze
 *
 * @typedef IdentityXUser
 * @prop {String} id
 * @prop {String} email
 *
 * @typedef IdentityXHookArgs
 * @prop {Object} additionalEventData
 * @prop {Object} authToken
 * @prop {BrazeConfig} brazeConfig
 * @prop {IdentityXService} service
 * @prop {IdentityXUser} user
 * @prop {String} loginSource
 *
 * @param {IdentityXHookArgs} args
 */
module.exports = async ({
  brazeConfig,
  loginSource,
  user,
  service,
}) => {
  const { req } = service;
  /** @type {BrazeRequest} */
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
      ...(user.verified && { verification_source: 'IdentityX' }),
    },
  });
  await braze.trackUser(user.email, user.id, payload);

  // Auto-subscribe the user
  if (loginSource === 'newsletterSignup') {
    await braze.updateSubscriptions(user.email, user.id, { [brazeConfig.defaultGroupId]: true });
  }
};

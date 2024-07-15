/**
 * @typedef {import('@parameter1/base-cms-marko-web-identity-x/service')} IdentityXService
 * @typedef {import('../service')} BrazeService
 * @typedef {import('../index').BrazeConfig} BrazeConfig
 * @typedef {import("../service")} BrazeService
 *
 * @typedef IdentityXRequest
 * @prop {BrazeService} braze
 *
 * @typedef {import('./on-authentication-success').IdentityXHookArgs} IdentityXHookArgs
 * @param {IdentityXHookArgs} args
 */
module.exports = async ({
  additionalEventData,
  brazeConfig,
  user,
  service,
}) => {
  /** @type {IdentityXRequest} */
  const { braze } = service.req;

  if (user && !user.verified) {
    await braze.unconfirmUser(user.email, user.id);
    await braze.updateSubscriptions(user.email, user.id, { [brazeConfig.defaultGroupId]: true });
  }

  if (user && user.verified && additionalEventData.actionSource === 'newsletterSignup') {
    await braze.updateSubscriptions(user.email, user.id, { [brazeConfig.defaultGroupId]: true });
  }

  return user;
};

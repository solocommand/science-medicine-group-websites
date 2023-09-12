/**
 * @typedef {import("../service")} BrazeService
 *
 * @typedef IdentityXRequest
 * @prop {BrazeService} braze
 */
module.exports = async ({ user, service }) => {
  /** @type {IdentityXRequest} */
  const { braze } = service.req;

  if (user && !user.verified) await braze.unconfirmUser(user.email, user.id);

  return user;
};

const { asyncRoute, getResponseCookies } = require('@parameter1/base-cms-utils');

module.exports = asyncRoute(async (req, res, next) => {
  const { identityX } = req;
  const COOKIE_NAME = 'braze_ext_id';
  const cookies = {
    ...req.cookies,
    ...getResponseCookies(res),
  }; // overwrite request cookies with response cookies
  const identityId = cookies[COOKIE_NAME];

  if (identityX.getIdentity(res)) return next(); // don't overwrite an existing identity
  if (!identityId) return next(); // no identity to set

  // verify that the user exists
  // This utilizes the same logic for determining a MongoDB ID as base-cms-db's BaseDB.coerceID
  const identity = /^[a-f0-9]{24}$/.test(identityId) ? await identityX.findUserById(identityId) : null;
  if (!identity) return next(); // invalid or deleted user, don't set an identity

  identityX.setIdentityCookie(identity.id);
  return next();
});

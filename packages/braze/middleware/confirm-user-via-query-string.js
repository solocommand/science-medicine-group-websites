const { asyncRoute } = require('@parameter1/base-cms-utils');

module.exports = asyncRoute(async (req, _, next) => {
  const { identityX, braze } = req;
  const { braze_ext_id: brazeExternalId } = req.query;
  // Only process requests with a matching query parameter
  if (!brazeExternalId) return next();

  // verify that the user exists
  // This utilizes the same logic for determining a MongoDB ID as base-cms-db's BaseDB.coerceID
  const identity = /^[a-f0-9]{24}$/.test(brazeExternalId) ? await identityX.findUserById(brazeExternalId) : null;
  if (!identity || identity.verified) return next(); // invalid or deleted user, don't confirm user
  // If the user is not verified confirm them within Braze
  if (!identity.verified) {
    await braze.confirmUser(identity.email, identity.id, 'identity-x');
  }
  return next();
});

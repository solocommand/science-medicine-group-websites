const tokenCookie = require('@parameter1/base-cms-marko-web-identity-x/utils/token-cookie');

const COOKIE_INTERNAL = 'braze_int_id';
const COOKIE_EXTERNAL = 'braze_ext_id';

/**
 * Handles the `braze_<ext|int>_id` query parameters.
 */
module.exports = (req, res, next) => {
  const curExternalId = req.cookies[COOKIE_EXTERNAL];
  const curInternalId = req.cookies[COOKIE_INTERNAL];
  const idxUserExists = tokenCookie.exists(req);
  const {
    [COOKIE_INTERNAL]: newExternalId,
    [COOKIE_EXTERNAL]: newInternalId,
  } = req.query;
  const { braze } = res.locals;

  // Only process requests with at least one matching query parameter
  if (!newExternalId && !newInternalId) return next();

  // If the user isn't logged in or doesn't have an external id cookie, set it.
  if (newExternalId && (!curExternalId || !idxUserExists)) {
    braze.setExternalId(newExternalId, res);
  }
  // If the user isn't logged in or doesn't have an internal id cookie, set it.
  if (newInternalId && (!curInternalId || !idxUserExists)) {
    braze.setInternalId(newInternalId, res);
  }

  return next();
};

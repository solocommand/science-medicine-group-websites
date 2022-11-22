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
    ...q
  } = req.query;

  // Only process requests with at least one matching query parameter
  if (!newExternalId && !newInternalId) return next();

  // If the user isn't logged in or doesn't have an external id cookie, set it.
  if (newExternalId && (!curExternalId || !idxUserExists)) {
    const options = { maxAge: 60 * 60 * 24 * 365, httpOnly: false };
    res.cookie(COOKIE_EXTERNAL, newExternalId, options);
  }
  // If the user isn't logged in or doesn't have an internal id cookie, set it.
  if (newInternalId && (!curInternalId || !idxUserExists)) {
    const options = { maxAge: 60 * 60 * 24 * 365, httpOnly: false };
    res.cookie(COOKIE_INTERNAL, newInternalId, options);
  }

  // Strip the query parameters from the request.
  if (newExternalId || newInternalId) {
    const params = (new URLSearchParams(q)).toString();
    const redirectTo = `${req.path}${params ? `?${params}` : ''}`;
    return res.redirect(302, redirectTo);
  }

  return next();
};

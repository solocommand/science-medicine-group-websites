const { get, getAsArray } = require('@parameter1/base-cms-object-path');
const contentGating = require('@parameter1/base-cms-marko-web-theme-monorail/middleware/content-gating');
const getCookie = require('../utils/get-cookie');

const COOKIE_NAME = '__idx_gating';

/**
 * Returns a tuple of the enabled/disabled state and required access level ids
 *
 * @param content Object
 * @param req Object
 * @param res Object
 *
 * @returns Promise([Boolean, String[]])
 */
module.exports = (app) => app.use((req, res, next) => {
  contentGating(app, true, ({ content }) => {
    const { identityX } = req;
    const requiresRegistration = get(content, 'userRegistration.isCurrentlyRequired');
    const accessLevels = getAsArray(content, 'userRegistration.accessLevels');

    // If the content isn't gated, do nothing.
    if (!requiresRegistration) return [requiresRegistration, accessLevels];

    // If a user is logged in, enable and don't do anything special.
    if (identityX && identityX.token) return [requiresRegistration, accessLevels];

    // Check for `__idx_gating` cookie, set by Braze Identity middleware
    const cookie = getCookie({ req, res, name: COOKIE_NAME });

    if (cookie) {
      try {
        const allowed = JSON.parse(cookie);
        return [!allowed, accessLevels];
      } catch (e) {
        // noop
      }
    }

    // Final fallback
    return [requiresRegistration, accessLevels];
  });
  next();
});

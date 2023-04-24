const { get } = require('@parameter1/base-cms-object-path');
const contentGating = require('@parameter1/base-cms-marko-web-theme-monorail/middleware/content-gating');
const getCookie = require('../utils/get-cookie');

const COOKIE_NAME = '__idx_gating';

/**
 * Returns the enabled/disabled state of the content object
 *
 * @param content Object
 * @param req Object
 * @param res Object
 *
 * @returns Promise(Boolean)
 */
module.exports = (app) => app.use((req, res, next) => {
  const fn = ({ content }) => {
    const { identityX } = req;
    const requiresRegistration = get(content, 'userRegistration.isCurrentlyRequired');

    // If the content isn't gated, do nothing.
    if (!requiresRegistration) return false;

    // If a user is logged in, enable and don't do anything special.
    if (identityX && identityX.token) return requiresRegistration;

    // Check for `__idx_gating` cookie, set by Braze Identity middleware
    const cookie = getCookie({ req, res, name: COOKIE_NAME });

    if (cookie) {
      try {
        const allowed = JSON.parse(cookie);
        return !allowed;
      } catch (e) {
        // noop
      }
    }

    // Final fallback
    return requiresRegistration;
  };

  contentGating(app, true, fn);
  next();
});

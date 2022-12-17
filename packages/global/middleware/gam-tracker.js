const { set } = require('@parameter1/base-cms-object-path');
const { asyncRoute } = require('@parameter1/base-cms-utils');
const fetch = require('node-fetch');

module.exports = asyncRoute(async (req, res, next) => {
  try {
    const { GAM_TRACK_API_KEY } = process.env;
    if (!GAM_TRACK_API_KEY) return next();
    const { identityX, braze } = res.locals;
    if (!identityX && !braze) return next();
    const identities = [];

    if (identityX) {
      const { application, user } = await identityX.loadActiveContext();
      if (application && application.id && user && user.id) {
        identities.push({
          provider: 'identity-x',
          tenant: application.id,
          entityType: 'app-user',
          id: user.id,
        });
      }
    }

    if (braze) {
      const brazeAppGroupId = braze.appGroupId;
      const brazeId = braze.internalId;
      if (brazeAppGroupId && brazeId) {
        identities.push({
          provider: 'braze',
          tenant: brazeAppGroupId,
          entityType: 'user',
          id: brazeId,
        });
      }
    }

    // Bail if no identity is available
    if (!identities.length) return next();

    const r = await fetch('https://api.gt.parameter1.dev', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-api-key': GAM_TRACK_API_KEY },
      body: JSON.stringify({
        action: 'encrypt',
        params: { identities },
      }),
    });
    if (!r.ok) throw new Error('Bad fetch response');
    const { data } = await r.json();
    set(res.locals, 'gamTrackTargeting', data);
    return next();
  } catch (e) {
    // @todo log this, don't break the request.
    const { error } = console;
    error('GAM TRACKER ERROR!', e);
    return next();
  }
});

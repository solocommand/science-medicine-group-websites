const { set } = require('@parameter1/base-cms-object-path');
const { asyncRoute } = require('@parameter1/base-cms-utils');
const fetch = require('node-fetch');

module.exports = asyncRoute(async (req, res, next) => {
  try {
    const { GAM_TRACK_API_KEY } = process.env;
    if (!GAM_TRACK_API_KEY) return next();
    const { identityX, braze } = res.locals;
    if (!identityX || !braze) return next();
    const identities = [];

    const { application, user } = await identityX.loadActiveContext();
    if (application.id && user.id) {
      identities.push({
        provider: 'identity-x',
        tenant: application.id,
        entityType: 'app-user',
        id: user.id,
      });
    }

    const brazeAppGroupId = braze.appGroupId;
    const brazeExtId = req.cookies.braze_ext_id;
    if (brazeAppGroupId && brazeExtId) {
      identities.push({
        provider: 'braze',
        tenant: brazeAppGroupId,
        entityType: 'external',
        id: brazeExtId,
      });
    }
    const brazeIntId = req.cookies.braze_int_id;
    if (brazeAppGroupId && brazeIntId) {
      identities.push({
        provider: 'braze',
        tenant: brazeAppGroupId,
        entityType: 'internal',
        id: brazeIntId,
      });
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

const { set } = require('@parameter1/base-cms-object-path');
const { asyncRoute } = require('@parameter1/base-cms-utils');
const fetch = require('node-fetch');
const tokenCookie = require('@parameter1/base-cms-marko-web-identity-x/utils/token-cookie');


module.exports = asyncRoute(async (req, res, next) => {
  try {
    const { GAM_TRACK_API_KEY } = process.env;
    if (!GAM_TRACK_API_KEY) return next();
    const { identityX } = res.locals;
    if (!identityX) return next();
    const idxAppId = identityX.config.appId;
    const idxUserId = tokenCookie.getFrom(req);
    if (!idxAppId || !idxUserId) return next();

    const r = await fetch('https://api.gt.parameter1.dev', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-api-key': GAM_TRACK_API_KEY },
      body: JSON.stringify({
        action: 'encrypt',
        params: {
          identities: [
            ...(idxUserId ? [{
              provider: 'identity-x',
              tenant: idxAppId,
              entityType: 'app-user',
              id: idxUserId,
            }] : []),
          ],
        },
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

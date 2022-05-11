const { get } = require('@parameter1/base-cms-object-path');
const defaultValue = require('@parameter1/base-cms-marko-core/utils/default-value');

const { asyncRoute } = require('@parameter1/base-cms-utils');
const { content: loader } = require('@parameter1/base-cms-web-common/page-loaders');
const buildContentInput = require('@parameter1/base-cms-marko-web/utils/build-content-input');
const queryFragment = require('@parameter1/base-cms-marko-web-theme-monorail/graphql/fragments/content-meter');

const cookieName = 'contentMeter';
const now = new Date().getTime();

async function shouldMeter(req) {
  const { apollo, params } = req;
  const config = req.app.locals.site.getAsObject('contentMeter');
  const { id } = params;
  const additionalInput = buildContentInput({ req });
  const content = await loader(apollo, { id, additionalInput, queryFragment });

  // @todo implement how the gate should be restricted
  // By type || By section || By primarySection
  // excludeContentTypes: Excludes content metering on page if type matches exclusions
  const excludeContentTypes = defaultValue(config.excludeContentTypes, []);
  if (excludeContentTypes.includes(content.type)) {
    return false;
  }
  // excludePrimarySectionIds: Excludes content metering on page that matches primarySection
  const excludePrimarySectionIds = defaultValue(config.excludePrimarySectionIds, []);
  if (excludePrimarySectionIds.includes(content.primarySection.id)) {
    return false;
  }
  // excludePrimarySectionAliass: Excludes content metering on page that matches primarySection
  const excludePrimarySectionAliass = defaultValue(config.excludePrimarySectionAliass, []);
  if (excludePrimarySectionAliass.includes(content.primarySection.alias)) {
    return false;
  }
  // excludeLabels: Excludes content metering on page that matches labels
  const excludeLabels = defaultValue(config.excludeLabels, []);
  const contentLabels = defaultValue(content.labels, []);
  if (excludeLabels.some(r => contentLabels.indexOf(r) >= 0)) {
    return false;
  }
  return true;
}

const getId = (value) => {
  if (!value) return null;
  const trimmed = `${value}`.trim();
  return /^[a-z0-9]{15}$/i.test(trimmed) ? trimmed : null;
};

module.exports = () => asyncRoute(async (req, res, next) => {
  const {
    identityX,
    params,
    query,
    cookies,
  } = req;
  const config = req.app.locals.site.getAsObject('contentMeter');
  const { id } = params;
  const idxObj = { isEnabled: true, requiredAccessLevelIds: [] };
  const contentAccess = await identityX.checkContentAccess(idxObj);
  const { isLoggedIn, requiresUserInput } = contentAccess;
  // oly_enc_id getting of query param or if cookie is present
  const idFromQuery = getId(query.oly_enc_id);
  const idFromCookie = cookies.oly_enc_id ? getId(cookies.oly_enc_id.replace(/^"/, '').replace(/"$/, '')) : undefined;
  const olyEncId = idFromQuery || idFromCookie;

  // If disabled, not logged in & have a oly_enc_id or logged in and have all required fields
  if (!config.enable || (!isLoggedIn && olyEncId) || (isLoggedIn && !requiresUserInput));

  else if (isLoggedIn && requiresUserInput && await shouldMeter(req)) {
    res.locals.contentMeterState = {
      isLoggedIn: true,
      requiresUserInput,
      displayGate: false,
    };
  } else if (config.enable && await shouldMeter(req)) {
    const hasCookie = Boolean(get(req, `cookies.${cookieName}`));

    const value = (hasCookie) ? JSON.parse(get(req, `cookies.${cookieName}`)) : [];
    let valid = value.filter(pageView => pageView.viewed > now - config.timeframe);

    if (valid.find(v => v.id === id)) {
      valid = valid.map((pageview) => {
        const { id: viewId } = pageview;
        if (viewId === id) return { id, viewed: now };
        return pageview;
      });
    } else if (valid.length < config.viewLimit) {
      valid.push({ id, viewed: now });
    }

    const displayGate = (valid.length >= config.viewLimit && !valid.find(v => v.id === id));

    res.locals.contentMeterState = {
      ...config,
      views: valid.length,
      isLoggedIn: false,
      requiresUserInput: true,
      displayGate,
    };
    res.cookie(cookieName, JSON.stringify(valid), { maxAge: config.timeframe });
  }
  next();
});

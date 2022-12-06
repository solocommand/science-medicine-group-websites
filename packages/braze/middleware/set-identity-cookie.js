const { asyncRoute } = require('@parameter1/base-cms-utils');
const { getAsArray } = require('@parameter1/base-cms-object-path');
const debug = require('debug')('gating');
const findAppUserById = require('../graphql/queries/find-user-by-id');

const COOKIE_NAME = '__idx_gating';
const COOKIE_MAXAGE = 7 * 24 * 60 * 60;

const getCookie = ({ req, res, name }) => {
  const parse = (cookies = []) => {
    try {
      return cookies.reduce((obj, cookie) => {
        const [key, value] = `${cookie};`.split(';')[0].split('=');
        return { ...obj, [key]: value };
      }, {});
    } catch (e) {
      // noop
    }
    return {};
  };

  const parsed = parse(res.get('set-cookie'));
  if (parsed[name]) return parsed[name];

  const { cookies } = req;
  return cookies[name];
};

const findUserBy = async ({ idx, id }) => {
  const { client, config } = idx;
  const apiToken = config.getApiToken();
  if (!apiToken) throw new Error('Unable to look up user: No API token has been configured.');
  const { data } = await client.query({
    query: findAppUserById,
    variables: { input: { id } },
    context: { apiToken },
  });
  return data.appUserById;
};

const hasAllRequiredFields = ({ idx, user }) => {
  const requiredFields = idx.config.getRequiredServerFields();
  const hasRequiredFields = requiredFields.every(f => user[f]);
  if (!hasRequiredFields) return false;

  // Check booleans
  const hasAllBools = getAsArray(user, 'customBooleanFieldAnswers').every(a => !a.field.required || a.hasAnswered);
  if (!hasAllBools) return false;

  // Check selects
  const hasAllSelects = getAsArray(user, 'customSelectFieldAnswers').every(a => !a.field.required || a.hasAnswered);
  if (!hasAllSelects) return false;

  return true;
};

/**
 * Sets the `__idx_gating` cookie based on incoming identity data
 */
module.exports = asyncRoute(async (req, res, next) => {
  // Don't do anything if a user is logged in.
  if (req.identityX && req.identityX.token) return next();

  // Bail if the cookie has already been set.
  if (getCookie({ req, res, name: COOKIE_NAME })) return next();

  // If we have Braze IDs, attempt to find and check the IdentityX user.
  const brazeExtId = getCookie({ req, res, name: 'braze_ext_id' });
  debug({ brazeExtId });
  if (!brazeExtId || !/^[a-z0-f]{24}$/g.test(brazeExtId)) return next();

  // Find the user in IdentityX.
  const user = await findUserBy({ idx: req.identityX, id: brazeExtId });
  const canAccess = user && hasAllRequiredFields({ idx: req.identityX, user });
  debug({ hasAllRequiredFields: canAccess });

  if (!res.headersSent) {
    res.cookie(COOKIE_NAME, JSON.stringify(canAccess), { maxAge: COOKIE_MAXAGE });
  }
  return next();
});

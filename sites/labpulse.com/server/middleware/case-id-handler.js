const { asyncRoute } = require('@parameter1/base-cms-utils');

/**
 * @param {object} req The Express request object.
 */
async function findPost(req) {
  const { originalUrl: from, query } = req;
  const { sec } = query;
  if (sec && query.URL) {
    const paramURL = new URL(query.URL);
    const params = paramURL.searchParams;
    const paramKeys = Array.from(params.keys());
    if (paramKeys.length) {
      // Account for differences in capitalization between querystrings
      // (See packages/globalmiddleware/item-id-handler.js for similar)
      const itemIDParamName = paramKeys.filter((v) => v.match(/^itemid$/i))[0];
      if (sec === 'log' && itemIDParamName) {
        return { from, to: '/page/Cases', code: 302 };
      }
      return null;
    }
    return null;
  }
  return null;
}

module.exports = () => asyncRoute(async (req, res, next) => {
  const { query: reqQuery } = req;
  if (!reqQuery) return next();
  const redirect = await findPost(req);
  if (redirect) return res.redirect(redirect.code, redirect.to);
  return next();
});

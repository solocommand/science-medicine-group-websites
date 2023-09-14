const { asyncRoute } = require('@parameter1/base-cms-utils');
const { get } = require('@parameter1/base-cms-object-path');
/**
 * @param {object} req The Express request object.
 * @param String param The key of the query sctring param you are looking for.
 * @param {object} keyToRedirects A key value object where key is the value of the queystring param
 * and the value is the redirec to use.
 */
async function findPost(req, param, keyToRedirects) {
  const { query: params } = req;
  const key = get(params, param);

  if (key) {
    const to = get(keyToRedirects, key);
    if (to) return { code: 301, to };
  }
  return null;
}

module.exports = ({ param, keyToRedirects }) => asyncRoute(async (req, res, next) => {
  const { query: reqQuery } = req;
  if (!reqQuery) return next();
  const redirect = await findPost(req, param, keyToRedirects);
  if (redirect) return res.redirect(redirect.code, redirect.to);
  return next();
});

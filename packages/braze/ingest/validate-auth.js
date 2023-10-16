/** Keys allowing authorization of alternate behavior */
const validKeys = JSON.parse(process.env.IDENTITYX_APP_API_KEYS || '[]');

/**
 * Ensures a valid auth key is present
 *
 * @param {import('express').Request} req
 * @throws {Error} If the api is not present or invalid.
 */
module.exports = (req) => {
  const authorization = req.get('authorization');
  if (!authorization) {
    const err = new Error('Authentication required.');
    err.statusCode = 401;
    throw err;
  }

  const [, key] = /^Bearer (.+)$/.exec(authorization) || [];
  if (!validKeys.includes(key)) {
    const err = new Error('Unauthorized.');
    err.statusCode = 403;
    throw err;
  }
};

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

/**
 * Retrieves a cookie by name from the response (first) or request (second)
 */
module.exports = ({ req, res, name }) => {
  const parsed = parse(res.get('set-cookie'));
  if (parsed[name]) return parsed[name];

  const { cookies } = req;
  return cookies[name];
};

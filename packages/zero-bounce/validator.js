/**
 * Validates the email address for IdentityX.
 *
 * @param {String} email The email address to verify
 * @param {Object} req The Express request instance
 * @returns {Tuple} [Boolean, String] the validation status and error message
 */
module.exports = async ({ email, req }) => {
  const { zeroBounce } = req;
  const resp = await zeroBounce.validateEmail(email, req.ip);
  console.log('zb', { email, status: resp.status, sub_status: resp.sub_status });
  const valid = zeroBounce.statusMap.get(resp.status) || false;
  return [valid, 'Email address cannot be used.'];
};

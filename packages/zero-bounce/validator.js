/**
 * Validates the email address for IdentityX.
 *
 * @param {String} email The email address to verify
 * @param {Object} req The Express request instance
 * @returns {Tuple} [Boolean, String] the validation status and error message
 */
module.exports = async ({ email, req }) => {
  const { zeroBounce } = req;
  const { status } = await zeroBounce.validateEmail(email, req.ip);
  const valid = zeroBounce.statusMap.get(status) || false;
  zeroBounce.status = status;
  if (!valid) throw new Error(`The email "${email}" is not allowed. Please enter a valid email address.`);
  return [valid];
};

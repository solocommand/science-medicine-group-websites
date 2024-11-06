const { isEmailBurner } = require('burner-email-providers');
const validator = require('validator');

const { log } = console;

/**
 * Determines if the supplied email is valid or not
 *
 * @param {string} email
 * @returns {boolean}
 */
module.exports = (email) => {
  try {
    if (!email) return false;
    const normalized = `${email}`.trim().toLowerCase();
    const isBurner = isEmailBurner(normalized);
    const isValid = validator.isEmail(normalized);
    const [, domain] = normalized.split('@');
    if (/\.com[a-z0-9]+/.test(domain)) return false;
    if (isBurner) return false;
    return isValid;
  } catch (e) {
    log('Unable to parse email address', email, e);
    return false;
  }
};

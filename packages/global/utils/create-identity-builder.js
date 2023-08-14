/**
 * @typedef IdentityXContext
 * @prop {IdentityXApp} application
 * @prop {IdentityXAppUser|null} user
 * @prop {Object[]} mergedTeams
 * @prop {Object[]} mergedAccessLevels
 * @prop {Boolean} hasTeams
 * @prop {Boolean} hasUser
 * @prop {Boolean} isEnabled
 *
 * @typedef IdentityXApp
 * @prop {String} id
 * @prop {String} name
 * @prop {String} consentPolicy
 * @prop {String} emailConsentRequest
 * @prop {Object[]} regionalConsentPolicies
 *
 * @typedef IdentityXAppUser
 * @prop {String} id
 * @prop {String} email
 *
 * @param {IdentityXContext} context
 */
module.exports = (context = {}) => {
  if (context.hasUser) {
    return `return 'identity-x.${context.application.id}.app-user*' + '${context.user.id}';`;
  }
  return '';
};

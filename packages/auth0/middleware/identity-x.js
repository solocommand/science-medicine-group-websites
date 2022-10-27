const { asyncRoute } = require('@parameter1/base-cms-utils');

const isEmpty = v => v == null || v === '';

/**
 * Determines if user input is required.
 *
 * @param {*} service The IdentityX service instance
 * @returns Boolean
 */
const isInputRequired = async (service) => {
  const { user: activeUser, application } = await service.loadActiveContext({ forceQuery: true });
  const user = activeUser || {};

  // Check that all requires fields (from IdentityX config) are set
  const requiredFields = service.config.getRequiredServerFields();
  const requiresUserInput = requiredFields.some(key => isEmpty(user[key]));
  if (requiresUserInput) return true;

  // Check that the user does not need to reverify their profile
  const mustReverify = Boolean(user.mustReVerifyProfile);
  if (mustReverify) return true;

  // Check that all regional consent policies are agreed to
  const { regionalConsentPolicies } = application.organization;
  const matchingPolicies = regionalConsentPolicies.filter((policy) => {
    const countryCodes = policy.countries.map(country => country.id);
    return countryCodes.includes(user.countryCode);
  });
  const policiesAnswered = user.regionalConsentAnswers
    .reduce((o, answer) => ({ ...o, [answer.id]: true }), {});
  const hasRequiredAnswers = matchingPolicies.length
    ? matchingPolicies.every(policy => policiesAnswered[policy.id])
    : true;

  return !hasRequiredAnswers;
};

module.exports = asyncRoute(async (req, res, next) => {
  // Only handle if Auth0 & IdentityX are loaded
  if (!req.oidc || !req.identityX) throw new Error('Auth0 and IdentityX must be enabled!');

  const { identityX: idxSvc, originalUrl } = req;

  if (idxSvc.token && req.query.isAuth0Login) {
    const profile = idxSvc.config.getEndpointFor('profile');
    const url = new URL(`${req.protocol}://${req.get('host')}${originalUrl}`);
    url.searchParams.delete('isAuth0Login');
    const returnTo = `${url}`;

    if (await isInputRequired(idxSvc)) {
      // If the user attempted to access the profile page, don't redirect after submission.
      if (url.pathname === profile) {
        res.redirect(302, profile);
      } else {
        res.redirect(302, `${profile}?returnTo=${encodeURIComponent(returnTo)}`);
      }
    } else {
      // Strip the query parameter
      res.redirect(302, returnTo);
    }
  } else {
    next();
  }
});

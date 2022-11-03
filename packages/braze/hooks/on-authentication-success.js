const { getAsArray } = require('@parameter1/base-cms-object-path');
const { updateIdentityXUser } = require('../utils');

/**
 *
 */
module.exports = async ({
  user,
  service,
  authToken,
  loginSource,
}) => {
  // Only set opt-ins from newsletter signup controls, not on every login!
  if (loginSource !== 'newsletterSignup') return; // @todo verify

  // Skip auto opt-in if the user has already opted in/out
  const hasAnswered = getAsArray(user, 'customBooleanFieldAnswers').some(ans => ans.hasAnswered === true);
  if (hasAnswered) return;

  const { req } = service;
  const { braze } = req;

  // Mark all subscription group questions as `true`.
  const questions = await braze.getSubscriptionGroupQuestions(service);
  const optIns = questions.reduce((obj, q) => ({ ...obj, [q.groupId]: true }), {
    // Opt out of unconfirmed group!
    [braze.getUnconfirmedGroupId()]: false,
  });
  const answers = questions.map(q => ({ fieldId: q.id, value: true }));

  // Update the IdentityX user profile
  await updateIdentityXUser(user.email, service, answers);

  // Force the IdX token context to change (for loadActiveContext);
  service.setToken(authToken.value);

  // Update the Braze subscription data
  const [, context] = await Promise.all([
    braze.updateSubscriptions(user.email, user.id, optIns),
    service.loadActiveContext({ forceQuery: true }),
  ]);

  // Overwrite the current user data with the info we just set
  // eslint-disable-next-line no-param-reassign
  if (context.user) user.customBooleanFieldAnswers = context.user.customBooleanFieldAnswers;
};

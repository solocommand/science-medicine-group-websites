const { updateIdentityXUser } = require('../utils');

/**
 *
 */
module.exports = async ({
  user,
  service,
  actionSource,
}) => {
  // Only set opt-ins from newsletter signup controls, not on every login!
  if (actionSource !== 'newsletterSignup') return;

  const { req } = service;
  const { braze } = req;

  // Mark all subscription group questions as `true`.
  const questions = await braze.getSubscriptionGroupQuestions(service);
  const optIns = questions.reduce((obj, q) => ({ ...obj, [q.groupId]: true }), {});
  const answers = questions.map(q => ({ fieldId: q.id, value: true }));

  // Update the IdentityX user profile
  await updateIdentityXUser(user.email, service, answers);

  // Update the Braze subscription data
  await braze.updateSubscriptions(user.email, user.id, optIns);
};

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
  // Only opt-in to unconfirmed if the user is not yet verified.
  if (user.verified) return;

  const { req } = service;
  const { braze } = req;

  // Mark all subscription group questions as `true`.
  const optIns = { [braze.getUnconfirmedGroupId()]: true };

  // Update the Braze subscription data
  await braze.updateSubscriptions(user.email, user.id, optIns);
};

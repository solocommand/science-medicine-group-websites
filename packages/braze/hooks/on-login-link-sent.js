/**
 *
 */
module.exports = async ({
  user,
  service,
  actionSource,
}) => {
  const { req } = service;
  const { braze } = req;

  // Only set opt-ins from newsletter signup controls, not on every login!
  if (actionSource !== 'newsletterSignup') return;

  // Only opt-in to unconfirmed if the user is not yet verified.
  if (user.verified) return;

  // Opt the user into the 'unconfirmed' group
  await braze.unconfirmUser(user.email, user.id);
};

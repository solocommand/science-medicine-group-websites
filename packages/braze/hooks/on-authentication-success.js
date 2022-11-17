/**
 *
 */
module.exports = async ({
  user,
  service,
}) => {
  const { req } = service;
  const { braze } = req;

  // Opt the user out of the 'unconfirmed' group
  await braze.confirmUser(user.email, user.id, 'identity-x');
};

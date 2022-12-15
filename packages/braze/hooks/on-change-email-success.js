const debug = require('debug')('braze');

/**
 *
 */
module.exports = async ({
  user,
  service,
  oldEmail,
}) => {
  const { req } = service;
  const { braze } = req;
  // Send an explicit trackUser call using the new email address
  await braze.trackUser(user.email, user.id);
  debug(`User ${user.id} changed email from ${oldEmail} to ${user.email}!`);
};

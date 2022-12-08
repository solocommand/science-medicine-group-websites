const debug = require('debug')('auth0');
const { get } = require('@parameter1/base-cms-object-path');

/**
 *
 */
module.exports = async ({
  user,
  service,
  oldEmail,
  auth0User,
}) => {
  const auth0 = get(service, 'req.auth0');
  await auth0.changeEmailAddress(user.email, auth0User.sub);
  debug(`User ${user.id} changed email from ${oldEmail} to ${user.email}!`);
};

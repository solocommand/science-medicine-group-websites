const { decode } = require('jsonwebtoken');
const { get } = require('@parameter1/base-cms-object-path');
const debug = require('debug')('auth0');

/**
 * Syncs Auth0 and IdentityX user states
 *
 * @param {RequestContext} req
 * @param {ResponseContext} res
 * @param {Object} session
 * @returns Object the Auth0 user session object
 */
module.exports = async (req, res, session) => {
  // Only handle if Auth0 & IdentityX are loaded
  if (!req.identityX) throw new Error('IdentityX must be enabled and configured!');

  const { identityX: service } = req;
  const { token } = service;
  const user = await decode(session.id_token);
  const tenant = get(req, 'auth0.tenant');

  // If there's no Auth0 context, or an IdX context already exists, there's nothing to do here.
  if (!user || token) return session;

  // Destroy A0 context if no email is present
  const { email } = user;
  debug('user', user);
  if (!email) {
    res.redirect('/user/auth0-no-email');
    throw new Error('Auth0 user must provide an email address.');
  }

  // Upsert the IdentityX AppUser
  // federate trusted verification state to IdX and log in via impersonation api
  try {
    const appUser = await service.createAppUser({ email });
    await Promise.all([
      service.impersonateAppUser({ userId: appUser.id }),
      service.addExternalUserId({
        userId: appUser.id,
        identifier: { value: user.sub },
        namespace: {
          provider: 'auth0',
          tenant,
          type: 'user',
        },
      }),
    ]);
    debug('impersonated', appUser.id);
  } catch (e) {
    debug('autherr', e, e.message);
    if (/Please enter a valid email address/.test(e.message)) {
      // Redirect to invalid notice
      debug('invalid email/redirect!');
      res.redirect(302, '/user/auth0-db-email-invalid');
    }
    throw e;
  }

  // Return the user session
  return session;
};

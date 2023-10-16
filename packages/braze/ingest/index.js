const debug = require('debug')('braze');
const { inspect } = require('util');
const { json } = require('express');
const { asyncRoute } = require('@parameter1/base-cms-utils');
const { get } = require('@parameter1/base-cms-object-path');
const buildSchema = require('./build-schema');
const setAppUserData = require('./set-app-user-data');
const setBrazeUserData = require('./set-braze-user-data');
const validateAuth = require('./validate-auth');

/**
 * @typedef RequestContext
 * @prop {import('@parameter1/base-cms-marko-web-identity-x/service')} identityX
 * @prop {import('../service')} braze
 *
 * @param {import('express').Application} app The Express app instance
 */
module.exports = (app) => {
  /**
   * Handles incoming requests to insert a user and return an IdentityX ID
   */
  app.post('/api/identity-x', json(), asyncRoute(async (req, res) => {
    const schema = buildSchema(req);
    try {
      validateAuth(req);
      /** @type {RequestContext} */
      const { identityX, braze } = req;
      const {
        // Standard fields
        email,
        givenName,
        familyName,
        street,
        addressExtra,
        city,
        countryCode,
        regionCode,
        postalCode,
        organization,
        organizationTitle,
        phoneNumber,

        // Custom Questions
        orgType,
        profession,
        technologies,
        subspecialties,

        // Behavior
        automaticOptIn,
        sendVerificationEmail,
        automaticConfirm,
        updateBraze,
      } = await schema.validateAsync(req.body); // @todo validation err throws uncaught promise

      const userData = {
        email,
        givenName,
        familyName,
        street,
        addressExtra,
        city,
        countryCode,
        regionCode,
        postalCode,
        organization,
        organizationTitle,
        phoneNumber,
      };

      const questions = {
        orgType: await orgType,
        profession: await profession,
        technologies: await Promise.all(technologies || []),
        subspecialties: await Promise.all(subspecialties || []),
      };

      const behaviors = {
        automaticOptIn,
        sendVerificationEmail,
        automaticConfirm,
        updateBraze,
      };

      let user = {};
      const existingUser = await identityX.loadAppUserByEmail(email);

      // Set user data, if possible
      if (!existingUser) user = await identityX.createAppUser({ email });

      // update user
      user = await setAppUserData(identityX, { userData, questions });

      // Auto opt-in
      if (automaticOptIn) {
        await braze.updateSubscriptions(user.email, user.id, { [braze.defaultGroupId]: true });
      }

      // Verification email send?
      if (sendVerificationEmail) await identityX.sendLoginLink({ appUser: user, source: 'idx-api' });

      // Auto confirm
      if (automaticConfirm) await braze.confirmUser(user.email, user.id, 'identity-x');

      if (updateBraze) setBrazeUserData(braze, { user });

      res.json({
        user,
        parsed: { userData, questions },
        behaviors,
      });
    } catch (error) {
      debug('error', inspect(error, { depth: null, colors: true }));
      const statusCode = get(error, 'details.0.context.error.statusCode') || error.statusCode || 500;
      res.status(statusCode).json({
        error: { message: error.message },
      });
    }
  }));
};

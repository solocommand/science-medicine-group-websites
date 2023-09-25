const debug = require('debug')('braze');
const { inspect } = require('util');
const { json } = require('express');
const { asyncRoute } = require('@parameter1/base-cms-utils');
const { get } = require('@parameter1/base-cms-object-path');
const buildSchema = require('./build-schema');

/**
 * Inserts/overwrites a user's data.
 *
 * @param {import('@parameter1/base-cms-marko-web-identity-x/service')} idx
 * @param {Object} a
 * @param {Object} a.userData
 * @param {Object} a.questions
 * @param {Object} a.behaviors
 */
const setAppUserData = async (idx, { userData, questions }) => {
  const { email } = userData;
  // Do something
  const user = await idx.createAppUser({ email, questions }); // @todo!
  return user;
};

/**
 * @param {import('express').Application} app The Express app instance
 */
module.exports = (app) => {
  /**
   * Handles incoming requests to insert a user and return an IdentityX ID
   */
  app.post('/api/identity-x', json(), asyncRoute(async (req, res) => {
    const schema = buildSchema(req);
    try {
      const { identityX } = req;
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
        overwriteIfPresent,
        automaticConfirm,
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
        orgType,
        profession,
        technologies,
        subspecialties,
      };

      const behaviors = {
        automaticOptIn,
        sendVerificationEmail,
        overwriteIfPresent,
        automaticConfirm,
      };

      let user = {};
      const existingUser = await identityX.loadAppUserByEmail(email);

      // Set user data, if possible
      if (existingUser) {
        if (overwriteIfPresent) {
          // update user
          user = await setAppUserData(identityX, { userData, questions });
        } else {
          // Throw? return?
          throw new Error(`User with email "${email}" already exists, and \`overwriteIfPresent\` is not enabled.`);
        }
      } else {
        user = await identityX.createAppUser({ email });
        user = await setAppUserData(identityX, { userData, questions });
      }

      // Auto opt-in

      // Verification email send?

      // Auto confirm

      res.json({
        user,
        parsed: { userData, questions },
        behaviors,
      });
    } catch (error) {
      debug('error', inspect(error, { depth: null, colors: true }));
      const statusCode = get(error, 'details.0.context.error.statusCode') || error.statusCode || 500;
      res.status(statusCode).json({ error });
    }
  }));
};

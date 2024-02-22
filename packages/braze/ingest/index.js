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
        org_type: orgType,
        profession,
        technologies,
        subspecialties,

        //
        subscriptions,

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
        org_type: await orgType,
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

      // Manage subscriptions
      if (Object.keys(subscriptions).length || automaticOptIn) {
        const payload = {
          ...subscriptions,
          ...(automaticOptIn && { [braze.defaultGroupId]: true }),
        };
        await braze.updateSubscriptions(user.email, user.id, payload);
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
  app.get('/api/identity-x', json(), asyncRoute(async (req, res) => {
    try {
      validateAuth(req);
      /** @type {RequestContext} */
      const { identityX } = req;
      const { email, userId } = req.query;
      if (email && userId) throw Error('email XOR (exclusive or) userId is permitted!');
      if (!email && !userId) throw Error('email XOR (exclusive or) userId is required!');
      const userFromEmail = email ? await identityX.loadAppUserByEmail(email) : null;
      const userById = userId ? await identityX.findUserById(userId) : null;
      if (userFromEmail) {
        res.json({
          user: userFromEmail,
          message: `User found for email: ${email}`,
        });
        return;
      }
      if (userById) {
        res.json({
          user: userById,
          message: `User found for userId: ${userId}`,
        });
        return;
      }
      res.status(404).json({
        user: {},
        message: 'User not found for input',
      });
    } catch (error) {
      debug('error', inspect(error, { depth: null, colors: true }));
      const statusCode = get(error, 'details.0.context.error.statusCode') || error.statusCode || 500;
      res.status(statusCode).json({
        error: { message: error.message },
      });
    }
  }));
  app.delete('/api/identity-x', json(), asyncRoute(async (req, res) => {
    try {
      validateAuth(req);
      /** @type {RequestContext} */
      const { identityX } = req;
      const { email, userId } = req.body;
      if (email && userId) throw Error('email XOR (exclusive or) userId is permitted!');
      if (!email && !userId) throw Error('email XOR (exclusive or) userId is required!');
      const userFromEmail = email ? await identityX.loadAppUserByEmail(email) : null;
      const userById = userId ? await identityX.findUserById(userId) : null;
      if (!userFromEmail && !userById) {
        res.status(404).json({
          user: {},
          message: 'User not found for input',
        });
        return;
      }
      const userWasDeleted = await identityX.deleteAppUserForCurrentApplication({
        ...(email && { email }),
        ...(userId && { userId }),
      });
      if (userWasDeleted) {
        res.json({
          message: 'User was deleted for provided input',
        });
        return;
      }
      res.status(500).json({
        message: 'Something went wrong with user deletion!',
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

const { auth } = require('express-openid-connect');
const Joi = require('@parameter1/joi');
const { validate } = require('@parameter1/joi/utils');
const { get } = require('@parameter1/base-cms-object-path');
const identityX = require('./identity-x');

/**
 *
 */
module.exports = (app, params = {}) => {
  const config = validate(Joi.object({
    authRequired: Joi.boolean().default(false),
    auth0Logout: Joi.boolean().default(true),
    baseURL: Joi.string().required(),
    clientID: Joi.string().required(),
    issuerBaseURL: Joi.string().required(),
    secret: Joi.string().required(),
    routes: Joi.object().default({ login: false }),
    afterCallback: Joi.function(),
  }), params);

  app.use((req, _, next) => {
    req.auth0Enabled = true;
    next();
  });

  app.use(auth(config));

  app.use((error, req, res, next) => {
    if (error.error === 'access_denied' && error.error_description === 'Please verify your email address to continue.') {
      const returnTo = get(req, 'openidState.returnTo');
      res.redirect(302, `/user/auth0-db-email-verification${returnTo ? `?returnTo=${returnTo}` : ''}`);
    }
    next(error); // invoke next middleware
  });

  // Redirect after login if `returnTo` URL parameter is present.
  if (config.routes.login === false) {
    app.get('/login', (req, res) => {
      const referrer = req.query.returnTo || req.get('referrer') || config.baseURL;
      let returnTo;
      try {
        returnTo = new URL(referrer);
      } catch (e) {
        returnTo = new URL(referrer, `${req.protocol}://${req.get('host')}`);
      }
      returnTo.searchParams.append('isAuth0Login', true);
      res.oidc.login({ returnTo: `${returnTo}` });
    });
  }

  // Load the IdentityX integration
  app.use(identityX);
};

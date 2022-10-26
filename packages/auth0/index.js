const Joi = require('@parameter1/joi');
const { validate } = require('@parameter1/joi/utils');
const identityX = require('@parameter1/base-cms-marko-web-identity-x');
const IdXConfig = require('@parameter1/base-cms-marko-web-identity-x/config');
const middleware = require('./middleware');
const afterCallback = require('./after-callback');
const templates = require('./templates');

module.exports = (app, params = {}) => {
  const {
    // Auth0 Configs
    baseURL,
    clientID,
    issuerBaseURL,
    clientSecret,
    // IdentityX Config
    idxConfig,
    idxRouteTemplates,
  } = validate(Joi.object({
    baseURL: Joi.string().required().description('The application\'s currently available URL.'),
    clientID: Joi.string().required().description('The application\'s Auth0 ClientID'),
    clientSecret: Joi.string().required().description('The application\'s Auth0 Client Secert'),
    issuerBaseURL: Joi.string().required().description('The Auth0 tenant URL'),
    idxConfig: Joi.object().required().instance(IdXConfig),
    idxRouteTemplates: Joi.object().required(),
  }), params);

  // install identity x
  identityX(app, idxConfig, { templates: idxRouteTemplates });

  // install auth0 middleware
  middleware(app, {
    baseURL,
    clientID,
    issuerBaseURL,
    secret: clientSecret,
    afterCallback,
  });

  // Custom template handling
  app.get('/user/auth0-db-email-verification', (_, res) => { res.marko(templates.dbEmailVerification); });
};

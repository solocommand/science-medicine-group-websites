const Joi = require('@parameter1/joi');
const { validate } = require('@parameter1/joi/utils');
const identityX = require('@parameter1/base-cms-marko-web-identity-x');
const IdXConfig = require('@parameter1/base-cms-marko-web-identity-x/config');
const middleware = require('./middleware');
const afterCallback = require('./after-callback');
const templates = require('./templates');
const changeEmail = require('./templates/change-email');
const Auth0 = require('./service');

module.exports = (app, params = {}) => {
  const {
    // Auth0 Configs
    baseURL,
    clientID,
    issuerBaseURL,
    apiAudienceURL,
    clientSecret,
    tenant,
    // IdentityX Config
    idxConfig,
    idxRouteTemplates,
  } = validate(Joi.object({
    baseURL: Joi.string().required().description('The application\'s currently available URL.'),
    clientID: Joi.string().required().description('The application\'s Auth0 ClientID'),
    clientSecret: Joi.string().required().description('The application\'s Auth0 Client Secert'),
    issuerBaseURL: Joi.string().required().uri().description('The (potentially customized) Auth0 tenant URL'),
    apiAudienceURL: Joi.string().uri().description('The original Auth0 tenant URL, used for the `aud` token parameter'),
    tenant: Joi.string().required().description('The Auth0 tenant key'),
    idxConfig: Joi.object().required().instance(IdXConfig),
    idxRouteTemplates: Joi.object().required(),
  }), params);

  // Install Auth0 (management service)
  app.use((req, res, next) => {
    const service = new Auth0({
      apiAudienceURL,
      clientID,
      issuerBaseURL,
      secret: clientSecret,
      tenant,
    });
    req.auth0 = service;
    res.locals.auth0 = service;
    next();
  });

  // install identity x
  identityX(app, idxConfig, { templates: idxRouteTemplates });

  // install auth0 middleware
  middleware(app, {
    afterCallback,
    baseURL,
    clientID,
    issuerBaseURL,
    secret: clientSecret,
  });

  // Custom template handling
  app.get('/user/auth0-db-email-verification', (_, res) => { res.marko(templates.dbEmailVerification); });
  app.get('/user/auth0-no-email', (_, res) => { res.marko(templates.noEmail); });
  app.get('/user/changeEmail', (_, res) => { res.marko(changeEmail); });
};

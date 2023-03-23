const Joi = require('@parameter1/joi');
const { validate } = require('@parameter1/joi/utils');
const setIdCookies = require('./middleware/set-id-cookies');
const Braze = require('./service');

module.exports = (app, params = {}) => {
  const args = validate(Joi.object({
    apiHost: Joi.string().uri().required().description('The Braze App Group REST API host from the Developer Console.'),
    apiKey: Joi.string().required().description('The Braze App Group REST API Key from the Developer Console.'),
    tenant: Joi.string().required().description('The IdentityX externalId tenant.'),
    fieldMap: Joi.object().default({
      external_id: 'id',
      email: 'email',
    }).description('The Braze fields that should be mapped to IdentityX fields.'),
    unconfirmedGroupId: Joi.string().required().description('The Braze Subscription Group ID to use for unconfirmed users'),
    appGroupId: Joi.string().required().description('The Braze App Group ID to use.'),
  }), params, { allowUnknown: true });

  app.use((req, res, next) => {
    const service = new Braze({ ...args, cookies: req.cookies || {} });
    req.braze = service;
    res.locals.braze = service;
    next();
  });

  // Set the internal and external id cookies if present in the URL.
  app.use(setIdCookies);
};

const Joi = require('@parameter1/joi');
const { validate } = require('@parameter1/joi/utils');
const setIdCookies = require('./middleware/set-id-cookies');
const Braze = require('./service');

/**
 * @typedef BrazeConfig
 * @prop {String} apiHost The Braze App Group REST API host from the Developer Console.
 * @prop {String} apiKey The Braze App Group REST API Key from the Developer Console.
 * @prop {String} tenant The IdentityX externalId tenant.
 * @prop {Object} fieldMap An object representing how fields should map from Braze to IdentityX.
 * @prop {String} appGroupId The Braze App Group ID to use.
 * @prop {String} defaultGroupId The Braze Subscription Group ID to use for auto-subscribing users.
 * @prop {String} unconfirmedGroupId The Braze Subscription Group ID to use for unconfirmed users.
 *
 * @returns {BrazeConfig}
 */

module.exports = (app, params = {}) => {
  const args = validate(Joi.object({
    apiHost: Joi.string().uri().required().description('The Braze App Group REST API host from the Developer Console.'),
    apiKey: Joi.string().required().description('The Braze App Group REST API Key from the Developer Console.'),
    tenant: Joi.string().required().description('The IdentityX externalId tenant.'),
    fieldMap: Joi.object().default({
      external_id: 'id',
      email: 'email',
    }).description('The Braze fields that should be mapped to IdentityX fields.'),
    defaultGroupId: Joi.string().required().description('The Braze Subscription Group ID to use for auto-subscribing users.'),
    unconfirmedGroupId: Joi.string().required().description('The Braze Subscription Group ID to use for unconfirmed users.'),
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

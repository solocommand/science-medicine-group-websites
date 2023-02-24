const Joi = require('@parameter1/joi');
const { validate } = require('@parameter1/joi/utils');
const routes = require('./routes');

module.exports = (app, params = {}) => {
  const config = validate(Joi.object({
    hookUri: Joi.string().uri().required().description('The Wordpress ICLE hook URI.'),
    apiKey: Joi.string().required().description('The Wordpress ICLE hook api key.'),
  }), params, { allowUnknown: true });

  // Load API endpoint (incoming hook handler)
  routes(app, config);
};

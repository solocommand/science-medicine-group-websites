const Joi = require('@parameter1/joi');
const { validate } = require('@parameter1/joi/utils');
const routes = require('./routes');

module.exports = (app, params = {}) => {
  const config = validate(Joi.object({
    hookUri: Joi.string().uri().required().description('The Wordpress ICLE hook URI.'),
    endpoint: Joi.string().uri().required().description('The Wordpress ICLE API URI.'),
    apiKey: Joi.string().required().description('The Wordpress ICLE hook api key.'),
  }), params, { allowUnknown: true });

  // Inject config state to response locals
  app.use((_, res, next) => {
    res.locals.icle = config;
    next();
  });

  // Load API endpoint (incoming hook handler)
  routes(app);
};

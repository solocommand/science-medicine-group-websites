const Joi = require('@parameter1/joi');
const { validate } = require('@parameter1/joi/utils');
const routes = require('./routes');

module.exports = (app, params = {}) => {
  const config = validate(Joi.object({
    enabled: Joi.bool().default(true),
    // Wordpress API details
    endpoint: Joi.string().uri().required().description('The Wordpress ICLE API URI.'),
    apiKey: Joi.string().required().description('The Wordpress ICLE hook api key.'),
    // AWS API details
    queueUrl: Joi.string().uri().required().description('The SQS queue to push new events to'),
    region: Joi.string().default('us-east-2'),
    accessKey: Joi.string().required(),
    secretKey: Joi.string().required(),
  }), params, { allowUnknown: true });

  // Inject config state to response locals
  app.use((_, res, next) => {
    res.locals.icle = config;
    next();
  });

  // Load API endpoint (incoming hook handler)
  routes(app);
};

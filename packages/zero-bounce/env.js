const { cleanEnv, validators } = require('@parameter1/base-cms-env');

const { nonemptystr } = validators;

module.exports = cleanEnv(process.env, {
  ZERO_BOUNCE_API_HOST: nonemptystr({ desc: 'The ZeroBounce API host', default: 'https://api.zerobounce.net' }),
  ZERO_BOUNCE_API_KEY: nonemptystr({ desc: 'The ZeroBounce API key' }),
});

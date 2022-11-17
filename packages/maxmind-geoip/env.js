const { cleanEnv, validators } = require('@parameter1/base-cms-env');

const { nonemptystr } = validators;

module.exports = cleanEnv(process.env, {
  MAXMIND_GEOIP_SERVICE_URL: nonemptystr({
    desc: 'The MaxMind GeoIP service URL.',
    default: 'http://maxmind-geoip',
  }),
});

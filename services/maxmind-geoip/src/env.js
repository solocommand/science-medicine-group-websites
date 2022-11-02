const {
  cleanEnv,
  str,
  bool,
  port,
  host,
} = require('envalid');

module.exports = cleanEnv(process.env, {
  MAXMIND_ACCOUNT_ID: str({ desc: 'The MaxMind account ID' }),
  MAXMIND_LICENSE_KEY: str({ desc: 'The MaxMind license key.' }),
  MAXMIND_GEOIP_HOST: str({ desc: 'The MaxMind GeoIP host.', default: 'https://geoip.maxmind.com' }),
  REDIS_CACHE_URL: str({ desc: 'The Redis cache server URL.' }),
  NEW_RELIC_LICENSE_KEY: str({ desc: 'The NewRelic license key.' }),
  NEW_RELIC_ENABLED: bool({ desc: 'NR status', devDefault: false }),
  PORT: port({ desc: 'The internal HTTP port', default: 80 }),
  EXPOSED_PORT: port({ desc: 'The external HTTP port', default: 80 }),
  HOST: host({ desc: 'The accessible HTTP host', default: '0.0.0.0' }),
});

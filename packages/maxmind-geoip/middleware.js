const { asyncRoute } = require('@parameter1/base-cms-utils');
const newrelic = require('newrelic');
const fetch = require('node-fetch');
const debug = require('debug')('maxmind');

const { MAXMIND_GEOIP_SERVICE_URL } = require('./env');

const { log } = console;

module.exports = asyncRoute(async (req, res, next) => {
  if (res.locals.maxmindData) return;
  let data = {};
  const ip = req.get('headers.cf-connecting-ip') || req.ip;
  debug(`Maxmind Lookup with client IP: ${ip} ERR`, { headers: req.headers });
  try {
    const response = await fetch(MAXMIND_GEOIP_SERVICE_URL, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'country',
        params: { ip },
      }),
    });
    data = await response.json();
    debug('Maxmind Lookup data:', { data });
  } catch (e) {
    log('Error in Maxmind GeoIP lookup!', e);
    newrelic.noticeError(e);
  }
  res.locals.maxmindData = data;
  next();
});

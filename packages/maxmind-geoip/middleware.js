const { asyncRoute } = require('@parameter1/base-cms-utils');
const newrelic = require('newrelic');
const fetch = require('node-fetch');
const { MAXMIND_GEOIP_SERVICE_URL } = require('./env');

const { log } = console;

module.exports = asyncRoute(async (req, res, next) => {
  if (res.locals.maxmindData) return;
  let data = {};
  try {
    const response = await fetch(MAXMIND_GEOIP_SERVICE_URL, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'country',
        params: { ip: req.ip },
      }),
    });
    data = await response.json();
  } catch (e) {
    log('Error in Maxmind GeoIP lookup!', e);
    newrelic.noticeError(e);
  }
  res.locals.maxmindData = data;
  next();
});

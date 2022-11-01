const fetch = require('node-fetch');
const { name, version } = require('../package.json');
const {
  MAXMIND_ACCOUNT_ID,
  MAXMIND_LICENSE_KEY,
  MAXMIND_GEOIP_HOST,
} = require('./env');

const headers = {
  Authorization: `Basic ${Buffer.from(`${MAXMIND_ACCOUNT_ID}:${MAXMIND_LICENSE_KEY}`).toString('base64')}`,
  'Content-Type': 'application/json',
  'User-Agent': `${name}@${version}/node-fetch`,
};

const request = async (endpoint, opts = {}) => {
  const r = await fetch(`${MAXMIND_GEOIP_HOST}/${endpoint}`, {
    method: 'get',
    headers,
    ...opts || {},
  });
  const response = await r.json();
  if (!r.ok) {
    if (response.message) throw new Error(response.message);
    throw new Error(`API request was unsuccessful: ${r.status} ${r.statusText}`);
  }
  return response;
};

module.exports = {
  request,
  country: ip => request(`geoip/v2.1/country/${ip}`),
};

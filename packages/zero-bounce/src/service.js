const Joi = require('@parameter1/joi');
const { validate } = require('@parameter1/joi/utils');
const fetch = require('node-fetch');

class ZeroBounce {
  constructor(params = {}) {
    const {
      apiKey,
      apiHost,
    } = validate(Joi.object({
      apiKey: Joi.string().required().description('The ZeroBounce API key'),
      apiHost: Joi.string().uri().default('https://api.zerobounce.net').description('The ZeroBounce API host'),
    }), params);
    this.apiKey = apiKey;
    this.apiHost = apiHost;
  }

  /**
   * Makes a request against the ZeroBounce API
   * @param {*} endpoint The ZB APi endpoint to request
   * @param {*} opts Additional fetch args
   * @returns Promise
   */
  async request(endpoint, opts = {}) {
    const r = await fetch(`${this.apiHost}/${endpoint}`, {
      method: 'get',
      ...opts || {},
    });
    const response = await r.json();
    if (!r.ok) {
      if (response.message) throw new Error(response.message);
      throw new Error(`API request was unsuccessful: ${r.status} ${r.statusText}`);
    }
    return response;
  }

  validateEmail(email, ipAddress = '') {
    const params = new URLSearchParams({
      api_key: this.apiKey,
      email: encodeURIComponent(email),
      ip_address: ipAddress || '',
    });
    const endpoint = `/v2/validate?${params}`;
    return this.request(endpoint);
  }

  /**
   * Determines if the supplied email/ip address should be considered valid
   * @param {*} email
   * @param {*} ipAddress
   * @returns Boolean
   */
  async isEmailValid(email, ipAddress = '') {
    const { status } = await this.validateEmail(email, ipAddress);
    switch (status) {
      // @todo make this mappable/configurable?
      case 'valid':
        return true;
      case 'catch-all':
        // Cannot be validated
        return true;
      case 'unknown':
        // @todo is this right?
        return true;
      default:
        return false;
    }
  }
}

module.exports = ZeroBounce;

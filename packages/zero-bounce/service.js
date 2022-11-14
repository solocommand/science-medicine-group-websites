const Joi = require('@parameter1/joi');
const { validate } = require('@parameter1/joi/utils');
const fetch = require('node-fetch');
const debug = require('debug')('zerobounce');

class ZeroBounce {
  constructor(params = {}) {
    const {
      apiKey,
      apiHost,
      statusMap,
    } = validate(Joi.object({
      apiKey: Joi.string().required().description('The ZeroBounce API key'),
      apiHost: Joi.string().uri().default('https://api.zerobounce.net').description('The ZeroBounce API host'),
      statusMap: Joi.object({
        valid: Joi.bool().default(true),
        'catch-all': Joi.bool().default(true),
        unknown: Joi.bool().default(false),
        invalid: Joi.bool().default(false),
        spam_trap: Joi.bool().default(false),
        abuse: Joi.bool().default(false),
        do_not_mail: Joi.bool().default(false),
      }).default(),
    }), params);
    this.apiKey = apiKey;
    this.apiHost = apiHost;
    this.statusMap = new Map(Object.entries(statusMap));
  }

  /**
   * Makes a request against the ZeroBounce API
   * @param {*} endpoint The ZB APi endpoint to request
   * @param {*} opts Additional fetch args
   * @returns Promise
   */
  async request(endpoint, opts = {}) {
    const method = opts.method || 'get';
    const url = `${this.apiHost}/${endpoint}`;
    const r = await fetch(url, { method, ...opts || {} });
    const response = await r.json();
    if (!r.ok) {
      debug(`${method.toUpperCase()} ${url} ERR`, { ...opts || {}, response });
      if (response.message) throw new Error(response.message);
      throw new Error(`API request was unsuccessful: ${r.status} ${r.statusText}`);
    }
    debug(`${method.toUpperCase()} ${url}  OK`, { ...opts || {}, response });
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
    return this.statusMap.get(status) || false;
  }
}

module.exports = ZeroBounce;

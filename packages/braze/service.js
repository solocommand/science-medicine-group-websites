const fetch = require('node-fetch');

const { log } = console;

class Braze {
  constructor({
    apiHost,
    apiKey,
    tenant,
    fieldMap,
  } = {}) {
    this.host = apiHost;
    this.tenant = tenant;
    this.fieldMap = fieldMap;
    this.headers = {
      'content-type': 'application/json',
      authorization: `Bearer ${apiKey}`,
    };
  }

  /**
   * Upserts a Braze user via the API.
   * @param {String} email The email address of the user.
   * @param {String} externalId The external ID to assign to the user
   * @param {Object} payload Aditional attributes to assign to the user.
   * @returns Object
   */
  async trackUser(email, externalId, payload = {}) {
    const r = await fetch(`${this.host}/users/track`, {
      method: 'post',
      headers: this.headers,
      body: JSON.stringify({
        attributes: [{
          ...payload,
          email,
          external_id: externalId,
        }],
      }),
    });
    const response = await r.json();
    if (!r.ok) {
      if (response.message) throw new Error(response.message);
      throw new Error(`API request was unsuccessful: ${r.status} ${r.statusText}`);
    }
    return response;
  }

  async updateSubscriptions(email, externalId, optIns = []) {
    log('updateSubscriptions', this.apiHost, optIns);
  }
}

module.exports = Braze;

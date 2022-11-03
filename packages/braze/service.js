const { getAsArray, get } = require('@parameter1/base-cms-object-path');
const fetch = require('node-fetch');
const identityXCustomQuestions = require('./graphql/queries/idx-app-custom-questions');
const { filterByExternalId } = require('./utils');

class Braze {
  constructor({
    apiHost,
    apiKey,
    tenant,
    fieldMap,
    unconfirmedGroupId,
  } = {}) {
    this.host = apiHost;
    this.tenant = tenant;
    this.fieldMap = fieldMap;
    this.headers = {
      'content-type': 'application/json',
      authorization: `Bearer ${apiKey}`,
    };
    this.unconfirmedGroupId = unconfirmedGroupId;
  }

  async request(endpoint, opts = {}) {
    const r = await fetch(`${this.host}/${endpoint}`, {
      method: 'post',
      headers: this.headers,
      ...opts || {},
    });
    const response = await r.json();
    if (!r.ok) {
      if (response.message) throw new Error(response.message);
      throw new Error(`API request was unsuccessful: ${r.status} ${r.statusText}`);
    }
    return response;
  }

  /**
   * Upserts a Braze user via the API.
   * @param {String} email The email address of the user.
   * @param {String} externalId The external ID to assign to the user
   * @param {Object} payload Aditional attributes to assign to the user.
   * @returns Object
   */
  async trackUser(email, externalId, payload = {}) {
    return this.request('users/track', {
      body: JSON.stringify({
        attributes: [{
          ...payload,
          email,
          external_id: externalId,
        }],
      }),
    });
  }

  /**
   *
   * @param {String} email The email address to (un)subscribe
   * @param {String} externalId The IdentityX user ID
   * @param {Object} optIns An object of opt-in statuses, keyed by the subscription group
   */
  async updateSubscriptions(email, externalId, optIns = {}) {
    return this.request('v2/subscription/status/set', {
      body: JSON.stringify({
        subscription_groups: Object.entries(optIns).map(([id, status]) => ({
          subscription_group_id: id,
          subscription_state: status ? 'subscribed' : 'unsubscribed',
          external_ids: [externalId],
          emails: [email],
        })),
      }),
    });
  }

  /**
   *
   * @param {String} email
   */
  async getSubscriptionStatus(email) {
    const endpoint = `subscription/user/status?email=${encodeURIComponent(email)}`;
    return this.request(endpoint, { method: 'get' });
  }

  /**
   * Used to retrieve IdentityX custom boolean questions for subscriptions
   * @param {*} identityX The IdentityX service instance
   */
  async getSubscriptionGroupQuestions(identityX) {
    const { data } = await identityX.client.query({ query: identityXCustomQuestions });
    const nodes = getAsArray(data, 'fields.edges').map(({ node }) => ({ field: node })).filter(n => n.field.active);
    const questions = filterByExternalId(nodes, 'subscriptionGroup', this.tenant);
    return questions.map(({ field }) => ({
      id: field.id,
      description: field.label,
      groupId: get(field, 'externalId.identifier.value'),
    }));
  }

  /**
   * Returns the Braze Subscription Group used to hold unconfirmed users
   */
  getUnconfirmedGroupId() {
    return this.unconfirmedGroupId;
  }
}

module.exports = Braze;

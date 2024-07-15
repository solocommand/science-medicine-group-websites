const { getAsArray, get } = require('@parameter1/base-cms-object-path');
const fetch = require('node-fetch');
const debug = require('debug')('braze');
const identityXCustomQuestions = require('./graphql/queries/idx-app-custom-questions');
const { filterByExternalId } = require('./utils');

/**
 * @typedef {import('@parameter1/base-cms-marko-web-identity-x/service')} IdentityXService
 */

class Braze {
  constructor({
    apiHost,
    apiKey,
    tenant,
    fieldMap,
    defaultGroupId,
    unconfirmedGroupId,
    appGroupId,
    cookies = {},
  } = {}) {
    this.host = apiHost;
    this.tenant = tenant;
    this.fieldMap = fieldMap;
    this.headers = {
      'content-type': 'application/json',
      authorization: `Bearer ${apiKey}`,
    };
    this.defaultGroupId = defaultGroupId;
    this.unconfirmedGroupId = unconfirmedGroupId;
    this.appGroupId = appGroupId;
    this.externalId = cookies.braze_ext_id;
    this.internalId = cookies.braze_int_id;
  }

  async request(endpoint, opts = {}) {
    const method = opts.method || 'post';
    const { headers } = this;
    const url = `${this.host}/${endpoint}`;
    const r = await fetch(url, { method, headers, ...opts || {} });
    const response = await r.json();
    if (!r.ok) {
      debug(`${method.toUpperCase()} ${url} ERR`, { headers, ...opts || {}, response });
      if (response.message) throw new Error(response.message);
      throw new Error(`API request was unsuccessful: ${r.status} ${r.statusText}`);
    }
    debug(`${method.toUpperCase()} ${url} OK`, { headers, ...opts || {}, response });
    return response;
  }

  /**
   * Deletes a Braze user via the API.
   * @param {String} externalId The external ID associated with the user to delete.
   * @returns Object
   */
  async deleteUser(externalId) {
    return this.request('users/delete', {
      body: JSON.stringify({
        external_ids: [externalId],
      }),
    });
  }

  /**
   * Upserts a Braze user via the API.
   * @param {String} email The email address of the user.
   * @param {String} externalId The external ID to assign to the user
   * @param {Object} payload Aditional attributes to assign to the user.
   * @returns Object
   */
  async trackUser(email, externalId, payload = {}) {
    const now = new Date();
    const nowISOString = now.toISOString();
    const [nowAsYYYYMMDD] = nowISOString && nowISOString.split('T').length ? nowISOString.split('T') : [];
    return this.request('users/track', {
      body: JSON.stringify({
        attributes: [{
          ...(nowAsYYYYMMDD && { last_email_activity_legacy: nowAsYYYYMMDD }),
          ...payload,
          email,
          external_id: externalId,
        }],
      }),
    });
  }

  /**
   * Sets the user's subscription group memberships.
   * @see https://www.braze.com/docs/api/endpoints/subscription_groups/post_update_user_subscription_group_status_v2/
   *
   * @param {String} email The email address to (un)subscribe
   * @param {String} externalId The IdentityX user ID
   * @param {Object} optIns An object of opt-in statuses, keyed by the subscription group
   * @returns {Promise}
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
   * Sets the user's subscription state to either `opted_in` or `subscribed
   * @see https://www.braze.com/docs/api/endpoints/email/post_email_subscription_status/
   *
   * @param {String} email
   * @param {Boolean} optedIn
   * @returns {Promise}
   */
  updateSubscriptionStatus(email, optedIn = false) {
    const state = optedIn === true ? 'opted_in' : 'subscribed';
    return this.request('email/status', {
      body: JSON.stringify({ email, subscription_state: state }),
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
   * @param {IdentityXService} identityX The IdentityX service instance
   * @typedef CustomBooleanQuestion
   * @prop {String} id
   * @prop {String} description
   * @prop {String} groupId
   * @returns {Promise<CustomBooleanQuestion[]>}
   */
  async getSubscriptionGroupQuestions(identityX) {
    const { data } = await identityX.client.query({ query: identityXCustomQuestions });
    const nodes = getAsArray(data, 'fields.edges').map(({ node }) => ({ field: node })).filter((n) => n.field.active);
    // 63038e5dd15c7c4b2e8b458a is the site ID for Aunt Minnie (Non-Europe)
    const isAuntMinnie = String(identityX.res.app.locals.config.website('id')) === '63038e5dd15c7c4b2e8b458a';
    const additionalFilter = isAuntMinnie ? (n) => n.field.name.match(/^AM - /) : (n) => n.field.name.match(/^AME - /);
    const nodesFinal = identityX.config.appId === '62a20ac739347c1810862985' ? nodes.filter(additionalFilter) : nodes;
    const questions = filterByExternalId(nodesFinal, 'subscriptionGroup', this.tenant);
    return questions.map(({ field }) => ({
      id: field.id,
      description: field.label,
      groupId: get(field, 'externalId.identifier.value'),
    }));
  }

  /**
   * Used to retrieve IdentityX custom boolean questions for subscriptions
   * @param {IdentityXService} identityX The IdentityX service instance
   * @typedef CustomSelectQuestion
   * @prop {String} id
   * @prop {Boolean} active
   * @prop {String} label
   * @prop {String} externalId
   * @prop {SelectFieldOptionChoice[]} options
   * @typedef SelectFieldOptionChoice
   * @prop {String} id
   * @prop {String} externalIdentifier
   * @returns {Promise<CustomSelectQuestion[]>}
   */
  async getDemographicQuestions(identityX) {
    const { data } = await identityX.client.query({ query: identityXCustomQuestions });
    const nodes = getAsArray(data, 'fields.edges').map(({ node }) => ({ field: node }));
    const questions = filterByExternalId(nodes, 'attribute', this.tenant);
    return questions.map(({ field }) => ({
      ...field,
      externalId: get(field, 'externalId.identifier.value'),
    }));
  }

  /**
   * Opts the user into the unconfirmed group, sets subscription status, and email validation
   *
   * @param {String} email
   * @param {String} id
   * @param {String} zeroBounceStatus
   * @returns {Promise}
   */
  unconfirmUser(email, id) {
    const { unconfirmedGroupId } = this;
    return Promise.all([
      this.updateSubscriptions(email, id, { [unconfirmedGroupId]: true }),
      this.updateSubscriptionStatus(email, false),
    ]);
  }

  /**
   * Opts the user out of the unconfirmed subscription group
   */
  confirmUser(email, id) {
    const { unconfirmedGroupId } = this;
    return Promise.all([
      this.updateSubscriptions(email, id, { [unconfirmedGroupId]: false }),
      this.updateSubscriptionStatus(email, true),
    ]);
  }

  /**
   * Sets the external id cookie and updates service state
   */
  setExternalId(id, res) {
    this.externalId = id;
    if (res.headersSent) {
      debug('Cannot set Braze external identifier, headers have already been sent!');
      return false;
    }
    const options = { maxAge: 60 * 60 * 24 * 365, httpOnly: false };
    res.cookie('braze_ext_id', id, options);
    return true;
  }

  /**
   * Sets the internal id cookie and updates service state
   */
  setInternalId(id, res) {
    this.internalId = id;
    if (res.headersSent) {
      debug('Cannot set Braze internal identifier, headers have already been sent!');
      return false;
    }
    const options = { maxAge: 60 * 60 * 24 * 365, httpOnly: false };
    res.cookie('braze_int_id', id, options);
    return true;
  }
}

module.exports = Braze;

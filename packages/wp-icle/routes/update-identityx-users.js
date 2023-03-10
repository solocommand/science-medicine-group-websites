const debug = require('debug')('wp-icle');
const fetch = require('node-fetch');
const { json } = require('express');
const { asyncRoute } = require('@parameter1/base-cms-utils');
const { get, getAsArray, getAsObject } = require('@parameter1/base-cms-object-path');
const callHooksFor = require('@parameter1/base-cms-marko-web-identity-x/utils/call-hooks-for');
const updateUserMutation = require('../graphql/mutations/update-user');
const freshUserQuery = require('../graphql/queries/user-by-id');
const identityXCustomQuestions = require('../graphql/queries/idx-app-custom-questions');

/**
 * Builds the IdentityX mutation payload from incoming Wordpress user profile data
 *
 * @param {*} svc The IdentityX service instance
 * @param {Object} profile The BuddyBoss custom profile dataset
 * @returns Object
 */
const buildPayload = async (svc, profile) => {
  const fieldMapping = new Map([
    ['First Name', 'givenName'],
    ['Last Name', 'familyName'],
    ['City', 'city'],
    ['Country', 'countryCode'],
    ['Organization', 'organization'],
    ['OrganizationTitle', 'organizationTitle'],
    ['Mobile Phone', 'phoneNumber'],
    ['Postal Code', 'postalCode'],
  ]);

  const getQuestions = async () => {
    const { data } = await svc.client.query({ query: identityXCustomQuestions });
    return getAsArray(data, 'fields.edges')
      .map(({ node }) => node)
      .filter((n) => n.active && n.type === 'select');
  };

  const payload = Object.keys(profile).reduce((obj, key) => {
    if (!fieldMapping.has(key)) return obj;
    const newKey = fieldMapping.get(key);
    const val = profile[key];
    return { ...obj, [newKey]: val };
  }, { email: profile.user_email });

  // load idx questions
  const questions = await getQuestions();

  // Build question payload
  const selects = [];
  const selectMap = new Map([
    ['Org Types', 'Organization Type'],
    ['Profession', 'Profession'],
    ['Technology', 'Technologies'],
    ['Subspecialty', 'Specialties'],
  ]);
  questions.forEach(({ id, name, options }) => {
    const key = selectMap.get(name);
    const values = Array.isArray(profile[key]) ? profile[key] : [profile[key]];
    if (!key || !values.length) return;

    const optionIds = values.map((answer) => {
      const found = options.find(({ label }) => label === answer);
      if (!found) debug(`Missing incoming option for "${name}" with label "${answer}"!`);
      return found ? found.id : null;
    }).filter((v) => v);

    // All selects are required per SMG, so field values should never be unset.
    if (optionIds.length) selects.push({ fieldId: id, optionIds });
  });

  payload.customSelectAnswers = selects;

  return payload;
};

/**
 * Updates the IdentityX user with the supplied field data
 *
 * @param {*} svc The IdentityX service instance
 * @param {*} payload The fields to update
 * @param {*} user The user to update
 */
const updateUser = async (svc, payload, user) => {
  const apiToken = svc.config.getApiToken();
  if (!apiToken) throw new Error('Unable to update IdentityX: no API token is present.');
  const { customSelectAnswers, ...fields } = payload;
  await svc.client.mutate({
    mutation: updateUserMutation,
    variables: {
      userId: user.id,
      payload: fields,
      answers: customSelectAnswers,
    },
    context: { apiToken },
  });
  const { data: { appUserById: freshUser } } = await svc.client.query({
    query: freshUserQuery,
    variables: { userId: user.id },
    context: { apiToken },
  });

  await callHooksFor(svc, 'onUserProfileUpdate', { user: freshUser });
};

/**
 *
 * @param {*} app The Express app instance
 * @param {*} config The WPICLE config object
 */
module.exports = (app) => {
  /**
   * Handles incoming requests from Amazon SQS/Lambda function to update IdentityX user data.
   */
  app.post('/api/update-identityx-users', json(), asyncRoute(async (req, res) => {
    const config = getAsObject(res, 'locals.icle');

    const { identityX: svc } = res.locals;
    if (!svc) throw new Error('Unable to load IdentityX user service!');

    if (req.get('authorization') !== `Bearer ${config.apiKey}`) {
      res.status(401).json({ error: 'API key is missing or invalid.' });
      return;
    }

    // Disable validator and ICLE hooks for this request
    const intialEnabled = config.enabled;
    const initialValidator = get(svc, 'config.options.emailValidator');
    svc.config.options.emailValidator = null;
    config.enabled = false;

    try {
      const batchItemFailures = [];

      const { body: records = [] } = req;
      const messageIds = new Map();
      const emails = records.map(({ messageId, body }) => {
        const { email } = JSON.parse(body);
        messageIds.set(email, messageId);
        return email;
      });

      const profiles = await (await fetch(config.endpoint, {
        method: 'post',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${config.apiKey}`,
        },
        body: JSON.stringify({ emails }),
      })).json();

      await Promise.allSettled(profiles.map(async (profile) => {
        const { user_email: email } = profile;
        const messageId = messageIds.get(email);
        if (!email) throw new Error('User could not be loaded!');
        try {
          // @todo handle ids/externalId for changed emails?
          const payload = await buildPayload(svc, profile);
          const user = await svc.createAppUser({ email });
          await updateUser(svc, payload, user);
        } catch (e) {
          debug(`Error: ${e.message}`, e);
          if (messageId) batchItemFailures.push(messageId);
        }
      }));

      res.json({
        name: 'user-update',
        batchItemFailures,
      });
    } catch (e) {
      res.status(500).json({ error: e.message });
    } finally {
      // Restore the validator and ICLE hooks
      svc.config.options.emailValidator = initialValidator;
      config.enabled = intialEnabled;
    }
  }));
};

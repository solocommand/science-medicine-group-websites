const debug = require('debug')('wp-icle');
const fetch = require('node-fetch');
const { json } = require('express');
const { asyncRoute } = require('@parameter1/base-cms-utils');
const { get, getAsArray } = require('@parameter1/base-cms-object-path');
const callHooksFor = require('@parameter1/base-cms-marko-web-identity-x/utils/call-hooks-for');
const updateUserMutation = require('../graphql/mutations/update-user');
const freshUserQuery = require('../graphql/queries/user-by-id');
const identityXCustomQuestions = require('../graphql/queries/idx-app-custom-questions');

const {
  WPICLE_ENDPOINT = 'https://staging.my.drbicuspid.com/api/identity-x/user',
  // WPICLE_ENDPOINT = 'http://host.docker.internal:8000/api/identity-x/user',
  WP_ICLE_HOOK_KEY,
} = process.env;

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

const getQuestions = async (svc) => {
  const { data } = await svc.client.query({ query: identityXCustomQuestions });
  return getAsArray(data, 'fields.edges')
    .map(({ node }) => node)
    .filter((n) => n.active && n.type === 'select');
};

const fetchUsers = async (emails) => {
  const response = await fetch(WPICLE_ENDPOINT, {
    method: 'post',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${WP_ICLE_HOOK_KEY}`,
    },
    body: JSON.stringify({ emails }),
  });
  return response.json();
};

const buildPayload = async (svc, profile) => {
  const payload = Object.keys(profile).reduce((obj, key) => {
    if (!fieldMapping.has(key)) return obj;
    const newKey = fieldMapping.get(key);
    const val = profile[key];
    return { ...obj, [newKey]: val };
  }, { email: profile.user_email });

  // load idx questions
  const questions = await getQuestions(svc);

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

const updateUser = async (svc, payload, user) => {
  // @todo Trigger user update idx hooks to fire Braze/etc.
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

  // @todo _dont_ re-fire user dispatch to WPICLE in this invocation (?)
  await callHooksFor(svc, 'onUserProfileUpdate', { user: freshUser });
};

module.exports = (app) => {
  /**
   *
   */
  app.post('/api/update-identityx-users', json(), asyncRoute(async (req, res) => {
    if (req.get('authorization') !== `Bearer ${WP_ICLE_HOOK_KEY}`) {
      res.status(401).json({ error: 'API key is missing or invalid.' });
      return;
    }

    try {
      const batchItemFailures = [];
      const { identityX: svc } = res.locals;
      if (!svc) throw new Error('Unable to load IdentityX user service!');

      // Disable validator for this request
      const validator = get(svc, 'config.options.emailValidator');
      svc.config.options.emailValidator = null;

      const { body: records = [] } = req;
      const messageIds = new Map();
      const emails = records.map(({ messageId, body }) => {
        const { email } = JSON.parse(body);
        messageIds.set(email, messageId);
        return email;
      });
      const profiles = await fetchUsers(emails);
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

      // Restore the validator
      svc.config.options.emailValidator = validator;
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }));
};

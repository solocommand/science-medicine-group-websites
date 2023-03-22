const debug = require('debug')('wp-icle');
const fetch = require('node-fetch');
const { json } = require('express');
const { asyncRoute } = require('@parameter1/base-cms-utils');
const { get, getAsArray, getAsObject } = require('@parameter1/base-cms-object-path');
const callHooksFor = require('@parameter1/base-cms-marko-web-identity-x/utils/call-hooks-for');
const regions = require('../regions');
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
const buildPayload = async ({ svc, profile, config }) => {
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

  // Parse region into regionCode.
  if (payload.countryCode === 'US' && profile['State/Region']) {
    const opts = Object.entries(regions.US);
    const comp = profile['State/Region'].toLocaleLowerCase();
    const [regionCode] = opts.find((opt) => comp === opt[1].name.toLocaleLowerCase()) || [];
    if (regionCode) {
      payload.regionCode = regionCode;
    } else {
      debug(`Unable to find US region code for "${profile['State/Region']}"`);
    }
  } else if (payload.countryCode === 'CA' && profile['State/Region CA']) {
    const opts = Object.entries(regions.CA);
    const comp = profile['State/Region CA'].toLocaleLowerCase();
    const [regionCode] = opts.find(([, data]) => comp === data.name.toLocaleLowerCase()) || [];
    if (regionCode) {
      payload.regionCode = regionCode;
    } else {
      debug(`Unable to find CA region code for "${profile['State/Region CA']}"`);
    }
  } else if (payload.countryCode === 'MX' && profile['State/Region MX']) {
    const opts = Object.entries(regions.MX);
    const comp = profile['State/Region MX'].toLocaleLowerCase();
    const [regionCode] = opts.find(([, data]) => comp === data.name.toLocaleLowerCase());
    if (regionCode) {
      payload.regionCode = regionCode;
    } else {
      debug(`Unable to find MX region code for "${profile['State/Region MX']}"`);
    }
  }

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

  // Set `siteNameRole` custom attribute
  const { siteName } = config.brazeConfig;
  payload.customAttributes = {
    [`${siteName}Role`]: getAsArray(profile, 'roles').includes('communitymember') ? 'Community Member' : 'Account Holder',
  };

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
  const { customSelectAnswers, customAttributes, ...fields } = payload;

  // The country changed, clean up the region and postal codes
  if (fields.countryCode && fields.countryCode !== user.countryCode) {
    // Explicitly unset fields if the country changed and we dont have a new value
    if (!fields.regionCode) fields.regionCode = null;
    if (fields.postalCode !== user.postalCode) fields.postalCode = null;
  }

  await svc.client.mutate({
    mutation: updateUserMutation,
    variables: {
      userId: user.id,
      payload: fields,
      answers: customSelectAnswers,
      attributes: customAttributes,
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
      const errors = [];

      const { body: records = [] } = req;
      const emails = records.reduce((map, { messageId, body }) => {
        debug(`Received user update from SQS with message id ${messageId}.`);
        const { email } = JSON.parse(body);
        if (!map.has(email)) map.set(email, []);
        map.get(email).push(messageId);
        return map;
      }, new Map());

      // make unique
      const profiles = await (await fetch(config.endpoint, {
        method: 'post',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${config.apiKey}`,
        },
        body: JSON.stringify({ emails: [...emails.keys()] }),
      })).json();

      // Change to all
      await Promise.all([...emails.keys()].map(async (email) => {
        try {
          const profile = profiles.find((p) => p.user_email === email);
          if (!profile) throw new Error(`User profile was not returned for ${email}!`);
          const payload = await buildPayload({ svc, profile, config });
          const user = await svc.createAppUser({ email });
          await updateUser(svc, payload, user);
        } catch (e) {
          const messageIds = emails.get(email);
          debug(`Error: ${e.message}`);
          errors.push(e.message);
          if (messageIds) batchItemFailures.push(...messageIds);
        }
      }));

      res.json({
        name: 'user-update',
        batchItemFailures,
        errors,
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

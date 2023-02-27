const debug = require('debug')('wp-icle');
const { json } = require('express');
const { asyncRoute } = require('@parameter1/base-cms-utils');
const { getAsArray } = require('@parameter1/base-cms-object-path');
const updateUserMutation = require('../graphql/mutations/update-user');
const identityXCustomQuestions = require('../graphql/queries/idx-app-custom-questions');

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
    .filter(n => n.active && n.type === 'select');
};

const buildPayload = async (svc, body) => {
  const payload = Object.keys(body.profile).reduce((obj, key) => {
    if (!fieldMapping.has(key)) return obj;
    const newKey = fieldMapping.get(key);
    const val = body.profile[key];
    return { ...obj, [newKey]: val };
  }, { email: body.profile.user_email });

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
    const values = Array.isArray(body.profile[key]) ? body.profile[key] : [body.profile[key]];
    debug({
      name, key, values, options: options.map(n => n.label),
    });
    if (!key || !values.length) return;

    const optionIds = values.map((answer) => {
      const found = options.find(({ label }) => label === answer);
      if (!found) debug(`Missing incoming option for "${name}" with label "${answer}"!`);
      return found ? found.id : null;
    }).filter(v => v);

    // All selects are required per SMG, so field values should never be unset.
    if (optionIds.length) selects.push({ fieldId: id, optionIds });
  });

  payload.customSelectAnswers = selects;

  return payload;
};

const updateUser = async (svc, payload, user) => {
  const { customSelectAnswers, ...fields } = payload;
  debug('updateUser vars', { userId: user.id, payload: fields, answers: customSelectAnswers });
  const { data } = await svc.client.mutate({
    mutation: updateUserMutation,
    variables: {
      userId: user.id,
      payload: fields,
      answers: customSelectAnswers,
    },
  });
  // @todo make update
  debug('updateUser', data);
  return user;
};

module.exports = (app, config) => {
  const { hookUri, apiKey, idxConfig } = config;
  /**
   * @todo avoid recursion between hook invocations
   * @todo investigate SQS intermediary with lambda execution.
   */
  app.post('/api/update-identityx-user', json(), asyncRoute(async (req, res) => {
    try {
      const { identityX: svc } = res.locals;
      if (!svc) throw new Error('Unable to load IdentityX user service!');
      // @todo validate auth header

      const { body } = req;
      const { user_email: email } = body.profile;
      const payload = await buildPayload(svc, body);

      const user = await svc.createAppUser({ email });
      await updateUser(svc, payload, user);

      // @todo Trigger user update idx hooks to fire Braze/etc.
      // @todo _dont_ re-fire user dispatch to WPICLE in this invocation (?)

      res.json({
        name: 'user-update',
        payload,
        user: user.id,
      });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }));
};

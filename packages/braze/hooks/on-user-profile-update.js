const { get, getAsArray } = require('@parameter1/base-cms-object-path');
const { filterByExternalId, buildPayload } = require('../utils');

/**
 *
 */
module.exports = async ({
  brazeConfig,
  user,
  service,
}) => {
  const { tenant, fieldMap } = brazeConfig;
  const { braze } = service.req;
  const payload = buildPayload({
    brazeConfig,
    user,
    payload: Object.keys(fieldMap).reduce((obj, k) => {
      const key = fieldMap[k];
      const val = get(user, k);
      return { ...obj, ...(val && { [key]: val }) };
    }, {}),
  });

  // External ID tagged questions
  const questions = filterByExternalId(getAsArray(user, 'customSelectFieldAnswers'), 'attribute', tenant);
  questions.forEach((ans) => {
    if (ans.hasAnswered) {
      const key = get(ans, 'field.externalId.identifier.value');
      const answers = getAsArray(ans, 'answers').map((a) => a.writeInValue || a.externalIdentifier);
      payload[key] = ans.field.multiple ? answers : answers.pop();
    }
  });

  // Update Braze with the user data
  await braze.trackUser(user.email, user.id, payload);

  // External ID tagged subscriptions
  const optins = filterByExternalId(getAsArray(user, 'customBooleanFieldAnswers'), 'subscriptionGroup', tenant);
  if (optins.length) {
    const subscriptions = optins.reduce((obj, ans) => {
      const key = get(ans, 'field.externalId.identifier.value');
      return { ...obj, [key]: ans.value };
    }, {});

    await braze.updateSubscriptions(user.email, user.id, subscriptions);
  }

  return user;
};

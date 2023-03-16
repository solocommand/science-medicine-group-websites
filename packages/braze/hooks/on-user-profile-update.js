const { get, getAsArray } = require('@parameter1/base-cms-object-path');
const { filterByExternalId, getFormatter } = require('../utils');

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
  const payload = {
    external_id: user.id,
    ...Object.keys(fieldMap).reduce((obj, k) => {
      const key = fieldMap[k];
      const val = get(user, k);
      return { ...obj, ...(val && { [key]: val }) };
    }, {}),
  };

  // External ID tagged questions
  const questions = filterByExternalId(getAsArray(user, 'customSelectFieldAnswers'), 'attribute', tenant);
  questions.forEach((ans) => {
    if (ans.hasAnswered) {
      const key = get(ans, 'field.externalId.identifier.value');
      const answers = getAsArray(ans, 'answers').map((a) => a.writeInValue || a.externalIdentifier);
      payload[key] = ans.field.multiple ? answers : answers.pop();
    }
  });

  // Append the site membership
  payload.site_membership = { add: brazeConfig.siteName };

  // Apply any site-specific payload customizations
  const formatter = getFormatter(brazeConfig.onUserProfileUpdateFormatter);
  await braze.trackUser(user.email, user.id, await formatter({ service, payload }));

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

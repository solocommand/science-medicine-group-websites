const IdentityXConfiguration = require('@parameter1/base-cms-marko-web-identity-x/config');
const newrelic = require('newrelic');

module.exports = ({
  appId,
  hiddenFields = [
    'street',
    'addressExtra',
    'city',
    'regionCode',
    'organization',
    'organizationTitle',
    'phoneNumber',
    'countryCode',
  ],
  defaultCountryCode = '',
  requiredServerFields = [
    'givenName',
    'familyName',
  ],
  requiredClientFields = [
    'givenName',
    'familyName',
  ],
  ...rest
} = {}) => {
  const config = new IdentityXConfiguration({
    appId,
    apiToken: process.env.IDENTITYX_API_TOKEN,
    defaultCountryCode,
    hiddenFields,
    requiredServerFields,
    requiredClientFields,
    booleanQuestionsLabel: 'Choose your subscriptions:',
    onHookError: newrelic.noticeError.bind(newrelic),
    ...rest,
  });
  return config;
};

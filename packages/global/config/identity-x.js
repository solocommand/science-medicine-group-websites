const IdentityXConfiguration = require('@parameter1/base-cms-marko-web-identity-x/config');
const newrelic = require('newrelic');

module.exports = ({
  appId,
  hiddenFields = [
    'street',
    'addressExtra',
    'organization',
    'organizationTitle',
    'phoneNumber',
  ],
  defaultCountryCode = '',
  requiredServerFields = [
    'givenName',
    'familyName',
    'city',
    'regionCode',
    'countryCode',
  ],
  requiredClientFields = [
    'givenName',
    'familyName',
    'city',
    'regionCode',
    'countryCode',
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

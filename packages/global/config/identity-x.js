const IdentityXConfiguration = require('@parameter1/base-cms-marko-web-identity-x/config');
const newrelic = require('newrelic');

module.exports = ({
  appId,
  hiddenFields = [
    'street',
    'addressExtra',
    'organizationTitle',
  ],
  defaultCountryCode = '',
  requiredServerFields = [
    'givenName',
    'familyName',
    'organization',
    'city',
    'regionCode',
    'countryCode',
    'phoneNumber',
  ],
  requiredClientFields = [
    'givenName',
    'familyName',
    'organization',
    'city',
    'regionCode',
    'countryCode',
    'phoneNumber',
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

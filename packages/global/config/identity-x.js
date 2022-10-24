const IdentityXConfiguration = require('@parameter1/base-cms-marko-web-identity-x/config');
const emailValidator = require('@science-medicine-group/package-zero-bounce/validator');
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
  ],
  requiredClientFields = [
    'givenName',
    'familyName',
    'organization',
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
    emailValidator,
    ...rest,
  });
  return config;
};

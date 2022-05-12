const IdentityXConfiguration = require('@parameter1/base-cms-marko-web-identity-x/config');
const newrelic = require('newrelic');

module.exports = ({
  appId,
  hiddenFields = [
    'organizationTitle',
    'phoneNumber',
    'street',
    'addressExtra',
    'city',
    'regionCode',
  ],
  defaultCountryCode = 'US',
  requiredServerFields = ['organization', 'countryCode', 'postalCode'],
  requiredClientFields = ['organization', 'countryCode', 'postalCode'],
  ...rest
} = {}) => {
  const config = new IdentityXConfiguration({
    appId,
    apiToken: process.env.IDENTITYX_API_TOKEN,
    defaultCountryCode,
    hiddenFields,
    requiredServerFields,
    requiredClientFields,
    onHookError: newrelic.noticeError.bind(newrelic),
    ...rest,
  });
  return config;
};

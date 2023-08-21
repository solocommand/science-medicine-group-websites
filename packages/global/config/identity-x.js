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
  ],
  requiredClientFields = [
    'givenName',
  ],
  defaultFieldLabels = {
    phoneNumber: 'Mobile Phone',
    organization: 'Organization',
  },
  ...rest
} = {}) => {
  const config = new IdentityXConfiguration({
    appId,
    apiToken: process.env.IDENTITYX_API_TOKEN,
    defaultCountryCode,
    hiddenFields,
    requiredServerFields,
    requiredClientFields,
    booleanQuestionsLabel: '',
    onHookError: newrelic.noticeError.bind(newrelic),
    emailValidator,
    defaultFieldLabels,
    enableChangeEmail: true,
    ...rest,
  });
  return config;
};

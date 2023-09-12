const Joi = require('@parameter1/joi');
const { validate } = require('@parameter1/joi/utils');

/**
 * @returns {import('@science-medicine-group/package-braze').BrazeConfig}
 */
module.exports = (params = {}) => {
  const {
    siteName,
    defaultGroupId,
    unconfirmedGroupId,
    appGroupId,
  } = validate(Joi.object({
    siteName: Joi.string().required().description('The Braze site membership identifier.'),
    defaultGroupId: Joi.string().required().description('The Braze Subscription Group ID to use for auto-subscribing users.'),
    unconfirmedGroupId: Joi.string().required().description('The Braze Subscription Group ID to use for unconfirmed users'),
    appGroupId: Joi.string().required().description('The Braze App Group ID to use.'),
  }), params);

  return {
    apiHost: 'https://rest.iad-05.braze.com',
    apiKey: process.env.BRAZE_API_KEY,
    tenant: 'smg',
    fieldMap: {
      id: 'external_id',
      givenName: 'first_name',
      familyName: 'last_name',
      email: 'email',
      city: 'home_city',
      countryCode: 'country',
      phoneNumber: 'phone',
      organization: 'org_name',
    },
    defaultGroupId,
    unconfirmedGroupId,
    siteName,
    appGroupId,
  };
};

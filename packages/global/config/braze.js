const Joi = require('@parameter1/joi');
const { validate } = require('@parameter1/joi/utils');

module.exports = (params = {}) => {
  const {
    siteName,
    subscriptionGroups,
  } = validate(Joi.object({
    siteName: Joi.string().required().description('The Braze site membership identifier.'),
    // @todo remove this when they can be retrieved from IdX
    subscriptionGroups: Joi.array().items(Joi.object({
      id: Joi.string().required().description('The IdentityX field ID'),
      label: Joi.string().required().description('Line 1/title'),
      description: Joi.string().description('Line 2/description'),
      groupId: Joi.string().required().description('The Braze subscription group ID'),
    })).description('The subscription options for the Braze preference center.'),
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
    onUserProfileUpdateFormatter: async ({ payload = [] }) => ({
      ...payload,
      site_membership: { add: siteName },
    }),
    subscriptionGroups,
  };
};

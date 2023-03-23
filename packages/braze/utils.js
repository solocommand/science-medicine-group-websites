const { get, getAsArray, getAsObject } = require('@parameter1/base-cms-object-path');
const updateAppUser = require('./graphql/mutations/idx-user-update-receive-email');

const requiredFields = [
  'givenName',
  'familyName',
  'city',
  'countryCode',
  'organization',
];

const getUserRole = ({
  user = {},
  payload = {},
  defaultRole = 'Account Holder',
  brazeConfig = {},
}) => {
  // Read from incoming payload
  const incoming = get(payload, 'role');
  if (incoming && incoming !== defaultRole) return incoming;
  // Read from custom attributes
  const attr = get(user, `customAttributes.${brazeConfig.siteName}Role`);
  if (attr && attr !== defaultRole) return attr;

  // Set role if all required fields are present.
  if (requiredFields.every(((k) => user[k]))) {
    // Check for region
    if ((['US', 'CA', 'MX'].includes(user.countryCode) && user.regionCode) || !user.regionCode) {
      // Check for all required select fields
      const questions = getAsArray(user, 'customSelectFieldAnswers').filter(({ field }) => field.required);
      if (questions.every(({ hasAnswered }) => hasAnswered)) {
        return 'Community Member';
      }
    }
  }
  return defaultRole;
};

module.exports = {
  filterByExternalId: (arr, type, tenant) => arr.filter((v) => {
    const ns = getAsObject(v, 'field.externalId.namespace');
    return ns.provider === 'braze' && ns.type === type && ns.tenant === tenant;
  }),
  getFormatter: (v) => (typeof v === 'function' ? v : (x) => x.payload),
  buildPayload: ({
    brazeConfig,
    user = {},
    payload = {},
  }) => ({
    external_id: user.id,
    site_membership: { add: brazeConfig.siteName },
    role: getUserRole({ user, brazeConfig }),
    ...payload,
  }),
  updateIdentityXUser: async (email, svc, answers) => {
    const user = await svc.createAppUser({ email });
    const apiToken = svc.config.getApiToken();
    if (!apiToken) throw new Error('Unable to set opt-in state: No IdentityX API token has been configured.');
    await svc.client.mutate({
      mutation: updateAppUser,
      variables: {
        input: {
          id: user.id,
          payload: { email, receiveEmail: true },
        },
        answers: {
          id: user.id,
          answers,
        },
      },
      context: { apiToken },
    });
    return user;
  },
};

const { getAsObject } = require('@parameter1/base-cms-object-path');
const updateAppUser = require('./graphql/mutations/idx-user-update-receive-email');

module.exports = {
  filterByExternalId: (arr, type, tenant) => arr.filter((v) => {
    const ns = getAsObject(v, 'field.externalId.namespace');
    return ns.provider === 'braze' && ns.type === type && ns.tenant === tenant;
  }),
  getFormatter: (v) => (typeof v === 'function' ? v : (x) => x.payload),
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

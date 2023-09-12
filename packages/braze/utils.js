const { getAsObject } = require('@parameter1/base-cms-object-path');
const updateAppUser = require('./graphql/mutations/idx-user-update-receive-email');

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
    ...payload,
  }),
  /**
   * Creates a user if not present, and sets the `receiveEmail` flag.
   *
   * @param {String} email
   * @param {import('@parameter1/base-cms-marko-web-identity-x/service')} svc
   * @returns
   */
  updateIdentityXUser: async (email, svc) => {
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
      },
      context: { apiToken },
    });
    return user;
  },
};

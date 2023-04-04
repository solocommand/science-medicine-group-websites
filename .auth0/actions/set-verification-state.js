/**
* Handler that will be called during the execution of a PostLogin flow.
*
* @param {Event} event - Details about the user and the context in which they are logging in.
* @param {PostLoginAPI} api - Interface whose methods can be used to change the behavior of the login.
*/
// @see https://community.auth0.com/t/how-to-deal-with-unverified-users/91808/3
exports.onExecutePostLogin = async (event, api) => {
  const { identities, email_verified } = event.user;
  const isDbUser = identities.some((id) => id.isSocial === false);
  api.idToken.setCustomClaim(`isDbUser`, isDbUser);
  // api.idToken.setCustomClaim('dbg', { q: event.request.query, u: event.user });

  const { verifyEmail } = event.request.query;
  // If we just verified the email, attempt to load previously stored login source/metadata
  if (verifyEmail) {
    const source = event.user.user_metadata['idx_source'] || event.request.query.source;
    const returnTo = event.user.user_metadata['idx_returnTo'];
    api.idToken.setCustomClaim('returnTo', returnTo);
    api.idToken.setCustomClaim('source', source);
    api.user.setUserMetadata('returnTo', undefined);
    api.user.setUserMetadata('source', undefined);
  } else {
    // const { source, additionalEventData, returnTo } = event.request.query;
    const { source, returnTo } = event.request.query;
    if (returnTo) api.user.setUserMetadata('idx_returnTo', returnTo);
    if (source) api.user.setUserMetadata('idx_source', source);
    // if (additionalEventData) {
    //   try {
    //     const parsed = JSON.parse(additionalEventData);
    //     Object.entries(parsed).forEach(([key, value]) => {
    //       api.user.setUserMetadata(`idx_${key}`, value);
    //     });
    //   } catch (e) {
    //     // noop
    //   }
    // }
  }

  if (!email_verified && isDbUser) {
    // Set custom claim to id token to make available
    api.idToken.setCustomClaim(`requireVerification`, true);
  }
};

/**
* Handler that will be invoked when this action is resuming after an external redirect. If your
* onExecutePostLogin function does not perform a redirect, this function can be safely ignored.
*
* @param {Event} event - Details about the user and the context in which they are logging in.
* @param {PostLoginAPI} api - Interface whose methods can be used to change the behavior of the login.
*/
// exports.onContinuePostLogin = async (event, api) => {
// };

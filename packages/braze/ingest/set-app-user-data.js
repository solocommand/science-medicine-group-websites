const dataMutation = require('./graphql/mutation/update-app-user-data');
const questionsMutation = require('./graphql/mutation/update-app-user-questions');
const userQuery = require('./graphql/query/user');
const buildPayload = require('./build-payload');

/**
 * Inserts/overwrites a user's data.
 *
 * @param {import('@parameter1/base-cms-marko-web-identity-x/service')} idx
 * @param {Object} a
 * @param {Object} a.userData
 * @param {Object} a.questions
 * @param {Object} a.behaviors
 *
 * @typedef IdentityXAppUser
 * @prop {ObjectID} id
 *
 * @return {IdentityXAppUser}
 */
module.exports = async (idx, { userData, questions }) => {
  const apiToken = idx.config.getApiToken();
  if (!apiToken) throw new Error('Unable to update IdentityX: no API token is present.');
  const { email } = userData;
  const user = await idx.loadAppUserByEmail(email);

  const {
    customSelectAnswers,
    customAttributes,
    ...fields
  } = await buildPayload(idx, { user, userData, questions });

  // The country changed, clean up the region and postal codes
  if (fields.countryCode && fields.countryCode !== user.countryCode) {
    // Explicitly unset fields if the country changed and we dont have a new value
    if (!fields.regionCode) fields.regionCode = null;
    // Remove the postalCode if the country changed and we don't have a new one
    if (fields.postalCode === user.postalCode) fields.postalCode = null;
  }

  await idx.client.mutate({
    mutation: dataMutation,
    variables: {
      userId: user.id,
      payload: fields,
    },
    context: { apiToken },
  });

  if (customSelectAnswers.length) {
    await idx.client.mutate({
      mutation: questionsMutation,
      variables: {
        userId: user.id,
        answers: customSelectAnswers,
      },
      context: { apiToken },
    });
  }

  const { data: { appUserById: freshUser } } = await idx.client.query({
    query: userQuery,
    variables: { userId: user.id },
    context: { apiToken },
  });
  return freshUser;
};

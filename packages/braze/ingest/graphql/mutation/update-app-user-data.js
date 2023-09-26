const gql = require('graphql-tag');

module.exports = gql`
mutation IdxApiUpdateAppUserData(
  $userId: String!,
  $payload: UpdateAppUserPayloadInput!,
) {
  updateAppUser(input: {
    id: $userId
    payload: $payload
  }) { id }
}
`;

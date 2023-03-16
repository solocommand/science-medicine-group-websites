const gql = require('graphql-tag');

module.exports = gql`
mutation UpdateUserFromWPICLE(
  $userId: String!,
  $payload: UpdateAppUserPayloadInput!,
  $answers: [UpdateAppUserCustomSelectAnswer!]!
  $attributes: JSONObject!
) {
  updateAppUser(input: {
    id: $userId
    payload: $payload
  }) { id }
  updateAppUserCustomSelectAnswers(input: {
    id: $userId
    answers: $answers
  }) { id }
  updateAppUserCustomAttributes(input: {
    id: $userId
    attributes: $attributes
  }) { id }
}
`;

const gql = require('graphql-tag');

module.exports = gql`
mutation UpdateIdxUser(
  $input: UpdateAppUserMutationInput!
  $answers: UpdateAppUserCustomBooleanAnswersMutationInput!
) {
  updateAppUser(input: $input) {
    id
  }
  updateAppUserCustomBooleanAnswers(input: $answers) {
    id
  }
}

`;

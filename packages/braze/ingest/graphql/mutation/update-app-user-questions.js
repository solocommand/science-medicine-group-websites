const gql = require('graphql-tag');

module.exports = gql`
mutation IdxApiUpdateAppUserQuestions(
  $userId: String!,
  $answers: [UpdateAppUserCustomSelectAnswer!]!
) {
  updateAppUserCustomSelectAnswers(input: {
    id: $userId
    answers: $answers
  }) { id }
}
`;

const gql = require('graphql-tag');
const activeUserFragment = require('../fragments/active-user');
const customBooleanFragment = require('../fragments/custom-boolean');

module.exports = gql`
query BrazeFindAppUser($input: AppUserQueryInput!) {
  appUser(input: $input) {
    ...BrazeActiveUserFragment
    customBooleanFieldAnswers(input: { onlyActive: true }) {
      ...CustomBooleanFieldAnswerFragment
    }
  }
}
${activeUserFragment}
${customBooleanFragment}
`;

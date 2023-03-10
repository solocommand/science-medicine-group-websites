const gql = require('graphql-tag');
const activeUserFragment = require('@parameter1/base-cms-marko-web-identity-x/api/fragments/active-user');

module.exports = gql`
query WPICLEFindUser($userId: String!) {
  appUserById(input: { id: $userId }) {
    ...ActiveUserFragment
  }
}
${activeUserFragment}
`;

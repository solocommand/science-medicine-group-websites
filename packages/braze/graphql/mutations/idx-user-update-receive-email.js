const gql = require('graphql-tag');

module.exports = gql`
mutation UpdateIdxUser(
  $input: UpdateAppUserMutationInput!
) {
  updateAppUser(input: $input) {
    id
  }
}

`;

const gql = require('graphql-tag');

module.exports = gql`
mutation SetAppUserReceiveEmail($input: UpdateAppUserMutationInput!) {
  updateAppUser(input: $input) {
    id
    email
    receiveEmail
  }
}
`;

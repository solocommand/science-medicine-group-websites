const gql = require('graphql-tag');

module.exports = gql`
fragment BrazeActiveUserFragment on AppUser {
  id
  email
  receiveEmail
}
`;

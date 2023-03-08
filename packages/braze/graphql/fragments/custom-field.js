const gql = require('graphql-tag');

module.exports = gql`
fragment BrazeCustomFieldFragment on FieldInterface {
  id
  active
  label
  externalId {
    id
    namespace {
      provider
      tenant
      type
    }
    identifier {
      value
    }
  }
}
`;

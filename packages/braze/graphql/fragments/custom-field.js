const gql = require('graphql-tag');

module.exports = gql`
fragment CustomFieldFragment on FieldInterface {
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

const gql = require('graphql-tag');

module.exports = gql`
fragment BrazeCustomFieldFragment on FieldInterface {
  id
  name
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
  ...on SelectField {
    options {
      id
      externalIdentifier
    }
  }
}
`;

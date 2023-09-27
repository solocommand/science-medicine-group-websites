const gql = require('graphql-tag');

module.exports = gql`
fragment IdxApiCustomFieldFragment on FieldInterface {
  id
  active
  name
  type
  externalId {
    id
    namespace { provider tenant type }
  }
  ...on SelectField {
    options {
      id
      label
    }
  }
}
`;

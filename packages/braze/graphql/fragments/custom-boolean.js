const gql = require('graphql-tag');

module.exports = gql`
fragment CustomBooleanFieldAnswerFragment on AppUserCustomBooleanFieldAnswer {
  id
  hasAnswered
  value
  field {
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
}
`;

const gql = require('graphql-tag');
const customFieldFragment = require('./custom-field');

module.exports = gql`
fragment CustomBooleanFieldAnswerFragment on AppUserCustomBooleanFieldAnswer {
  id
  hasAnswered
  value
  field {
    ...BrazeCustomFieldFragment
  }
}
${customFieldFragment}
`;

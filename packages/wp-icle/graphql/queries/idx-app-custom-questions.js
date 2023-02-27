const gql = require('graphql-tag');
const customFieldFragment = require('../fragments/custom-field');

module.exports = gql`
query WPICLEFindAppFields {
  fields(input: { sort: { field: createdAt, order: asc } }) {
    edges {
      node {
        ...CustomFieldFragment
      }
    }
  }
}
${customFieldFragment}
`;

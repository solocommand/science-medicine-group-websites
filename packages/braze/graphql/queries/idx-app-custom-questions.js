const gql = require('graphql-tag');
const customFieldFragment = require('../fragments/custom-field');

module.exports = gql`
query BrazeFindAppFields {
  fields(input: {
    sort: { field: createdAt, order: asc },
    pagination: { limit: 50 }
  }) {
    edges {
      node {
        ...BrazeCustomFieldFragment
      }
    }
  }
}
${customFieldFragment}
`;

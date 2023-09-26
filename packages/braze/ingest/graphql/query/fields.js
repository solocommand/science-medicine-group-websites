const gql = require('graphql-tag');

module.exports = gql`
query IdxApiFindAppFields {
  fields(input: { sort: { field: createdAt, order: asc } }) {
    edges {
      node {
        id
        active
        name
        type
        externalId {
          id
          identifier { type value }
          namespace { provider tenant type }
        }
        ...on SelectField {
          options {
            id
            label
          }
        }
      }
    }
  }
}
`;

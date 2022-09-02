const gql = require('graphql-tag');

module.exports = gql`
fragment WebsiteDirectorySectionPageFragment on WebsiteSection {
  id
  name
  alias
  fullName
  description
  hierarchy {
    id
    alias
    name
  }
  parent {
    id
    name
    alias
  }
  children {
    edges {
      node {
        id
        alias
        name
      }
    }
  }
}
`;

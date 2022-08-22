const gql = require('graphql-tag');

module.exports = gql`

fragment DirectorySectionFeedBlockContentFragment on Content {
  id
  type
  shortName
  labels
  teaser(input: { useFallback: false, maxLength: null })
  siteContext {
    path
  }
  primarySection {
    id
    name
    fullName
    canonicalPath
  }
  ... on Addressable {
    address1
    address2
    cityStateZip
    city
    state
    country
  }
  ... on Contactable {
    phone
    tollfree
    website
  }
}

`;

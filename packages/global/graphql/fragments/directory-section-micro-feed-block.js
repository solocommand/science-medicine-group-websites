const gql = require('graphql-tag');

module.exports = gql`

fragment DirectorySectionMicroFeedBlockContentFragment on Content {
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
  primaryImage {
    id
    src(input: { options: { auto: "format,compress", q: 70 } })
    alt
    isLogo
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

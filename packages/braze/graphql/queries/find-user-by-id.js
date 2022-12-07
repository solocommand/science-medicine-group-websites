const gql = require('graphql-tag');

module.exports = gql`
query FindAppUserFromBrazeId($input: AppUserByIdQueryInput!) {
  appUserById(input: $input) {
    id
    email
    # Additional required fields
    givenName
    familyName
    organization
    city
    regionCode
    countryCode
    # Custom boolean fields
    customBooleanFieldAnswers(input: { onlyActive: true }) {
      id
      field { required }
      hasAnswered
    }
    # Custom select fields
    customSelectFieldAnswers(input: { onlyActive: true }) {
      id
      field { required }
      hasAnswered
    }
  }
}
`;

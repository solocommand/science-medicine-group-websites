const configureIdentityX = require('@science-medicine-group/package-global/config/identity-x');

module.exports = configureIdentityX({
  appId: '627aa48d6f730119a9a152a5',
  requiredServerFields: [
    'givenName',
    'familyName',
    'countryCode',
    'postalCode',
  ],
});

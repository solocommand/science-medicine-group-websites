const configureIdentityX = require('@science-medicine-group/package-global/config/identity-x');

module.exports = configureIdentityX({
  appId: process.env.IDENTITYX_APPID || '62a20ac739347c1810862985',
  requiredServerFields: [
    'givenName',
  ],
  requiredClientFields: [
    'givenName',
  ],
});

const configureIdentityX = require('@science-medicine-group/package-global/config/identity-x');

module.exports = configureIdentityX({
  appId: process.env.IDENTITYX_APPID || '629bac8439347cfce3861789',
  activeCustomFieldIds: [
    '632b700aae524323475b92ee', // profession
    '632b7010ae52430ee85b92ef', // org type
    '632cafd0ae52433e7a5b9552', // subspeciality
    '632cb03eae5243dea45b9560', // technology
  ],
});

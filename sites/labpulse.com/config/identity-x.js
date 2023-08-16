const configureIdentityX = require('@science-medicine-group/package-global/config/identity-x');

module.exports = configureIdentityX({
  appId: process.env.IDENTITYX_APPID || '629bac8439347cfce3861789',
});

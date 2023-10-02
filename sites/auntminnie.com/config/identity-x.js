const configureIdentityX = require('@science-medicine-group/package-global/config/identity-x');

module.exports = configureIdentityX({
  appId: process.env.IDENTITYX_APPID || '62a20ac739347c1810862985',
  activeCustomFieldIds: [
    '642ee9eb3e8177b0b6dc7bca', // Title
    '642eec7ee5f1a5e91d60f946', // Function
  ],
  gtmUserFields: {
    function: '642eec7ee5f1a5e91d60f946',
    profession: '642ee9eb3e8177b0b6dc7bca',
    subspecialty: '642edcd7537782d6c21b8477',
    technology: '642ed5e07694b719e293319a',
  },
});

const configureIdentityX = require('@science-medicine-group/package-global/config/identity-x');
const formDefault = require('@science-medicine-group/package-global/config/identity-x/default');

formDefault.anonymousCta = 'Register on AuntMinnie.com to download this document, gain access to premium content, and more.';

// append custom demos row of questions to the end of general questions
formDefault.fieldRows.push(
  [
    {
      label: 'Profession',
      id: '642eec7ee5f1a5e91d60f946',
      type: 'custom-select',
      required: true,
      width: 0.5,
    },
    {
      label: 'Function',
      id: '642ee9eb3e8177b0b6dc7bca',
      type: 'custom-select',
      required: true,
      width: 0.5,
    },
  ],
);

module.exports = configureIdentityX({
  appId: process.env.IDENTITYX_APPID || '62a20ac739347c1810862985',
  activeCustomFieldIds: [
    '642ee9eb3e8177b0b6dc7bca', // Profession
    '642eec7ee5f1a5e91d60f946', // Function
  ],
  forms: {
    default: formDefault,
  },
  gtmUserFields: {
    function: '642eec7ee5f1a5e91d60f946',
    profession: '642ee9eb3e8177b0b6dc7bca',
    subspecialty: '642edcd7537782d6c21b8477',
    technology: '642ed5e07694b719e293319a',
  },
});

const configureIdentityX = require('@science-medicine-group/package-global/config/identity-x');
const formDefault = require('@science-medicine-group/package-global/config/identity-x/default');

formDefault.anonymousCta = 'Register on AuntMinnie.com to access this content.';

// append custom demos row of questions to the end of general questions
// formDefault.fieldRows.push(
//   [
//     {
//       label: 'Profession',
//       id: '642ee9eb3e8177b0b6dc7bca',
//       type: 'custom-select',
//       required: true,
//       width: 0.5,
//     },
//     {
//       label: 'Function',
//       id: '642eec7ee5f1a5e91d60f946',
//       type: 'custom-select',
//       required: true,
//       width: 0.5,
//     },
//   ],
// );

module.exports = configureIdentityX({
  appId: process.env.IDENTITYX_APPID || '627aa48d6f730119a9a152a5',
  activeCustomFieldIds: [
  ],
  forms: {
    default: formDefault,
  },
});

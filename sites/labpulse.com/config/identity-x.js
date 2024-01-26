const configureIdentityX = require('@science-medicine-group/package-global/config/identity-x');
const formDefault = require('@science-medicine-group/package-global/config/identity-x/default');

formDefault.anonymousCta = 'Register on AuntMinnie.com to access this content.';

// append custom demos row of questions to the end of general questions
formDefault.fieldRows.push(
  [
    {
      label: 'Profession',
      id: '632b700aae524323475b92ee',
      type: 'custom-select',
      required: true,
      width: 0.5,
    },
    {
      label: 'Function',
      id: '632b7010ae52430ee85b92ef',
      type: 'custom-select',
      required: true,
      width: 0.5,
    },
  ],
);

module.exports = configureIdentityX({
  appId: process.env.IDENTITYX_APPID || '629bac8439347cfce3861789',
  activeCustomFieldIds: [
    '632b700aae524323475b92ee', // profession
    '632b7010ae52430ee85b92ef', // org type
    '632cafd0ae52433e7a5b9552', // subspeciality
    '632cb03eae5243dea45b9560', // technology
  ],
  forms: {
    default: formDefault,
  },
  gtmUserFields: {
    function: '632b7010ae52430ee85b92ef',
    profession: '632b700aae524323475b92ee',
    subspecialty: '632cafd0ae52433e7a5b9552',
    technology: '632cb03eae5243dea45b9560',
  },
});

const configureIdentityX = require('@science-medicine-group/package-global/config/identity-x');
const formDefault = require('@science-medicine-group/package-global/config/identity-x/default');

formDefault.anonymousCta = 'Register on AuntMinnie.com to access this content.';

// append custom demos row of questions to the end of general questions
formDefault.fieldRows.push(
  [
    {
      label: 'Profession',
      id: '63c8717dcf43bf9bffdb4578',
      type: 'custom-select',
      required: true,
      width: 0.5,
    },
    {
      label: 'Function',
      id: '63c87088cf43bf32bfdb4576',
      type: 'custom-select',
      required: true,
      width: 0.5,
    },
  ],
);

module.exports = configureIdentityX({
  appId: process.env.IDENTITYX_APPID || '62a20ab439347c3abb862984',
  activeCustomFieldIds: [
    '63c8717dcf43bf9bffdb4578', // profession
    '63c87088cf43bf32bfdb4576', // org type
    '63c87203cf43bf57e0db458b', // subspeciality
    '63c872cbcf43bf3b55db459b', // technology
  ],
  forms: {
    default: formDefault,
  },
  gtmUserFields: {
    function: '63c87088cf43bf32bfdb4576',
    profession: '63c8717dcf43bf9bffdb4578',
    subspecialty: '63c87203cf43bf57e0db458b',
    technology: '63c872cbcf43bf3b55db459b',
  },
});

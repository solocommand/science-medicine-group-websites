const configureIdentityX = require('@science-medicine-group/package-global/config/identity-x');

module.exports = configureIdentityX({
  appId: process.env.IDENTITYX_APPID || '62a20ab439347c3abb862984',
  activeCustomFieldIds: [
    '63c87088cf43bf32bfdb4576', // org type
    '63c8717dcf43bf9bffdb4578', // profession
    '63c87203cf43bf57e0db458b', // subspeciality
    '63c872cbcf43bf3b55db459b', // technology
  ],
});

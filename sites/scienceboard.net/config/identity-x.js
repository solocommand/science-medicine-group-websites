const configureIdentityX = require('@science-medicine-group/package-global/config/identity-x');

module.exports = configureIdentityX({
  appId: process.env.IDENTITYX_APPID || '627aa48d6f730119a9a152a5',
  activeCustomFieldIds: [
  ],
  gtmUserFields: {
    primary_business: '627bdb1b07348b7722f33e3b',
    job_title: '627bdb266f73013480a15483',
  },
});

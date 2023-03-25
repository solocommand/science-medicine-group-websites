const onUserProfileUpdate = require('./on-user-profile-update');
const onChangeEmailSuccess = require('./on-change-email-success');

module.exports = (idxConfig, icleConfig) => {
  idxConfig.addHook({
    name: 'onUserProfileUpdate',
    shouldAwait: false,
    fn: (args) => onUserProfileUpdate({ icleConfig, ...args }),
  });
  idxConfig.addHook({
    name: 'onChangeEmailSuccess',
    shouldAwait: true,
    fn: (args) => onChangeEmailSuccess({ icleConfig, ...args }),
  });
};

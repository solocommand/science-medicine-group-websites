const onAuthenticationSuccess = require('./on-authentication-success');
const onChangeEmailSuccess = require('./on-change-email-success');
const onUserProfileUpdate = require('./on-user-profile-update');

module.exports = (idxConfig, brazeConfig) => {
  // Update Braze with new values
  idxConfig.addHook({
    name: 'onUserProfileUpdate',
    shouldAwait: false,
    fn: (args) => onUserProfileUpdate({ brazeConfig, ...args }),
  });

  // Handle changeEmail success
  idxConfig.addHook({
    name: 'onChangeEmailSuccess',
    shouldAwait: true,
    fn: (args) => onChangeEmailSuccess({ brazeConfig, ...args }),
  });

  idxConfig.addHook({
    name: 'onAuthenticationSuccess',
    shouldAwait: true,
    fn: (args) => onAuthenticationSuccess({ brazeConfig, ...args }),
  });
};

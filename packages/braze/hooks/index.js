const onAuthenticationSuccess = require('./on-authentication-success');
const onChangeEmailSuccess = require('./on-change-email-success');
const onLoginLinkSent = require('./on-login-link-sent');
const onUserProfileUpdate = require('./on-user-profile-update');

module.exports = (idxConfig, brazeConfig) => {
  // Update Braze with new values
  idxConfig.addHook({
    name: 'onUserProfileUpdate',
    shouldAwait: false,
    fn: (args) => onUserProfileUpdate({ brazeConfig, ...args }),
  });

  idxConfig.addHook({
    name: 'onLoginLinkSent',
    shouldAwait: false,
    fn: (args) => onLoginLinkSent({ brazeConfig, ...args }),
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

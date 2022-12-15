const onUserProfileUpdate = require('./on-user-profile-update');

module.exports = (idxConfig, brazeConfig) => {
  // Update Braze with new values
  idxConfig.addHook({
    name: 'onUserProfileUpdate',
    shouldAwait: false,
    fn: args => onUserProfileUpdate({ brazeConfig, ...args }),
  });
};

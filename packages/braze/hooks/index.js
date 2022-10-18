const onUserProfileUpdate = require('./on-user-profile-update');

const { log } = console;

module.exports = (idxConfig, brazeConfig) => {
  log('adding braze hooks to idx', idxConfig, brazeConfig);

  // Update Braze with new values
  idxConfig.addHook({
    name: 'onUserProfileUpdate',
    shouldAwait: false,
    fn: args => onUserProfileUpdate({ brazeConfig, ...args }),
  });
};

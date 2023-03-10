const onUserProfileUpdate = require('./on-user-profile-update');

module.exports = (idxConfig, icleConfig) => {
  idxConfig.addHook({
    name: 'onUserProfileUpdate',
    shouldAwait: false,
    fn: (args) => onUserProfileUpdate({ icleConfig, ...args }),
  });
};

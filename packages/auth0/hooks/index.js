const onChangeEmailSuccess = require('./on-change-email-success');

module.exports = (idxConfig, auth0Config) => {
  idxConfig.addHook({
    name: 'onChangeEmailSuccess',
    shouldAwait: true,
    fn: (args) => onChangeEmailSuccess({ auth0Config, ...args }),
  });
};

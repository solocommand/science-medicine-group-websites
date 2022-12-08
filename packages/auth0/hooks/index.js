const onChangeEmailSuccess = require('./on-change-email-success');

module.exports = (app, idxConfig, auth0Config) => {
  // Wrap this in a middleware so that the resolved user object can be passed to the IdentityX hook
  app.use((req, _, next) => {
    const { user } = req.oidc;
    // Handle changeEmail success
    idxConfig.addHook({
      name: 'onChangeEmailSuccess',
      shouldAwait: true,
      fn: args => onChangeEmailSuccess({ auth0Config, auth0User: user, ...args }),
    });
    next();
  })
};

const updateIdentityXUsers = require('./update-identityx-users');

module.exports = (app, config) => {
  updateIdentityXUsers(app, config);
};

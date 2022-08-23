const { auth } = require('express-openid-connect');

module.exports = (app, config) => {
  app.use(auth(config));
};

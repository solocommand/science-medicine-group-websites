const template = require('../templates/google-search');

module.exports = (app) => {
  app.get('/search', (_, res) => res.marko(template));
};

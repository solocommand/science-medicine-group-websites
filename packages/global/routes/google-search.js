const template = require('../templates/google-search');

module.exports = (app) => {
  app.get('/__google-search', (_, res) => res.marko(template));
};

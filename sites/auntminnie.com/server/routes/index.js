const itemIdHandler = require('@science-medicine-group/package-global/middleware/item-id-handler');
const directory = require('@science-medicine-group/package-global/routes/directory');
const home = require('./home');
const conference = require('./conference');
const content = require('./content');
const dynamicPages = require('./dynamic-page');
const websiteSections = require('./website-section');

module.exports = (app) => {
  // Content Redirect Handler
  app.use(itemIdHandler());
  // Homepage
  home(app);

  // Dynamic Pages
  dynamicPages(app);

  // Content Pages
  content(app);

  // Directory Pages have to happen after content or they wont match
  directory(app, 'resources/vendors');

  conference(app);

  // Website Sections
  websiteSections(app);
};

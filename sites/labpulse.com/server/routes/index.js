const itemIdHandler = require('@science-medicine-group/package-global/middleware/item-id-handler');
const directory = require('@science-medicine-group/package-global/routes/directory');
const caseIdHandler = require('../middleware/case-id-handler');
const home = require('./home');
const content = require('./content');
const dynamicPages = require('./dynamic-page');
const websiteSections = require('./website-section');

module.exports = (app) => {
  // Content Redirect Handler
  app.use(itemIdHandler());
  // Case Redirect Handler
  app.use(caseIdHandler());
  // Homepage
  home(app);

  // Dynamic Pages
  dynamicPages(app);

  // Content Pages
  content(app);

  // Directory Pages have to happen after content or they wont match
  directory(app, 'resources/vendors');

  // Website Sections
  websiteSections(app);
};

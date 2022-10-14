const itemIdHandler = require('@science-medicine-group/package-global/middleware/item-id-handler');
const home = require('./home');
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

  // Website Sections
  websiteSections(app);
};

const directory = require('@science-medicine-group/package-global/routes/directory');
const home = require('./home');
const content = require('./content');
const dynamicPages = require('./dynamic-page');
const websiteSections = require('./website-section');

module.exports = (app) => {
  // Homepage
  home(app);

  // Dynamic Pages
  dynamicPages(app);

  // Content Pages
  content(app);

  // Directory Pages have to happen after content or they wont match
  directory(app, 'vendor-connect');

  // Website Sections
  websiteSections(app);
};

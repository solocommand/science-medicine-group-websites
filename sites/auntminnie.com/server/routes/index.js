const { asyncRoute } = require('@parameter1/base-cms-utils');
const itemIdHandler = require('@science-medicine-group/package-global/middleware/item-id-handler');
const paramKeyToRedirectHandler = require('@science-medicine-group/package-global/middleware/param-key-to-redirect-handler');
const directory = require('@science-medicine-group/package-global/routes/directory');
const home = require('./home');
const conference = require('./conference');
const content = require('./content');
const dynamicPages = require('./dynamic-page');
const websiteSections = require('./website-section');
const keyToRedirects = require('../../config/ceId-redirects-obj');

module.exports = (app) => {
  // Content Redirect Handler
  app.use(itemIdHandler());

  app.use(paramKeyToRedirectHandler({ param: 'ce_id', keyToRedirects }));

  // Redirect any url that has queryParam sec=cls & sub=emp to https://auntminnie.careerwebsite.com
  app.use(asyncRoute(async (req, res, next) => {
    const { query: reqQuery } = req;
    if (!reqQuery) return next();
    const { sec, sub } = reqQuery;
    if (!sec || !sub) return next();
    if (sec === 'cls' && sub === 'emp') res.redirect(301, 'https://auntminnie.careerwebsite.com/');
    return next();
  }));

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

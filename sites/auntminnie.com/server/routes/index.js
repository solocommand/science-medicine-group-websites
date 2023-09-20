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

/**
  * @param {Object} object
  * @param {string} key
  * @return {any} value
 */
function getParameterCaseInsensitive(object, key) {
  const asLowercase = key.toLowerCase();
  return object[Object.keys(object)
    .find((k) => k.toLowerCase() === asLowercase)
  ];
}

module.exports = (app) => {
  // Content Redirect Handler
  app.use(itemIdHandler());

  app.use(paramKeyToRedirectHandler({ param: 'ce_id', keyToRedirects }));

  // Redirect any url that has queryParam sec=cls & sub=emp to https://auntminnie.careerwebsite.com
  // Redirect any url that has queryParam sec=olc & sub=cotx not found via paramKeyToRedirectHandler
  // to /page/case-not-found
  app.use(asyncRoute(async (req, res, next) => {
    const { query: reqQuery } = req;
    if (!reqQuery) return next();
    if (getParameterCaseInsensitive(reqQuery, 'sec') === 'cls'
      || getParameterCaseInsensitive(reqQuery, 'sub') === 'emp'
    ) res.redirect(301, 'https://auntminnie.careerwebsite.com/');
    if (getParameterCaseInsensitive(reqQuery, 'sec') === 'olc'
      || getParameterCaseInsensitive(reqQuery, 'sub') === 'cotx'
    ) res.redirect(301, '/page/case-not-found');
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

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
    if (getParameterCaseInsensitive(reqQuery, 'sec') === 'edu') {
      res.redirect(301, 'https://my.auntminnie.com/cases');
    }
    if (getParameterCaseInsensitive(reqQuery, 'sec') === 'log'
    || getParameterCaseInsensitive(reqQuery, 'sec') === 'def'
    || getParameterCaseInsensitive(reqQuery, 'sec') === 'eba'
    || getParameterCaseInsensitive(reqQuery, 'sec') === 'cas'
    || getParameterCaseInsensitive(reqQuery, 'sec') === 'dsc') {
      res.redirect(301, '/');
    }
    if (getParameterCaseInsensitive(reqQuery, 'sub') === 'bsp'
      || getParameterCaseInsensitive(reqQuery, 'sub') === 'prm') {
      res.redirect(301, '/page/advertising');
    }
    if (getParameterCaseInsensitive(reqQuery, 'sub') === 'br') {
      res.redirect(301, '/page/area-not-found');
    }
    if (getParameterCaseInsensitive(reqQuery, 'sec') === 'olce') {
      res.redirect(301, 'https://my.auntminnie.com/cases/');
    }
    if (getParameterCaseInsensitive(reqQuery, 'sec') === 'cns') {
      res.redirect(301, '/resources/conference');
    }
    if (getParameterCaseInsensitive(reqQuery, 'sec') === 'cls'
      || getParameterCaseInsensitive(reqQuery, 'sub') === 'emp') {
      res.redirect(301, 'https://auntminnie.careerwebsite.com/');
    }
    if (getParameterCaseInsensitive(reqQuery, 'sec') === 'olc'
      || getParameterCaseInsensitive(reqQuery, 'sub') === 'cotx') {
      res.redirect(301, '/page/case-not-found');
    }
    return next();
  }));

  // Redirect any url whose path starts with /radiology-jobs to https://auntminnie.careerwebsite.com
  app.use(asyncRoute(async (req, res, next) => {
    if (req.path.match(/^\/radiology-jobs/)) {
      res.redirect(301, 'https://auntminnie.careerwebsite.com/');
    }
    // Any url whose path starts with /rss to /feed
    if (req.path.match(/^\/rss/)) {
      res.redirect(301, '/feed');
    }
    // Any url whose path starts with /Digital-X-Ray to /clinical-news/digital-x-ray
    if (req.path.match(/^\/Digital-X-Ray/)) {
      res.redirect(301, '/clinical-news/digital-x-ray');
    }
    // Any url whose path starts with /Molecular-Imaging to /clinical-news/molecular-imaging
    if (req.path.match(/^\/Molecular-Imaging/)) {
      res.redirect(301, '/clinical-news/molecular-imaging');
    }
    // Any url whose path starts with /Ultrasound to /clinical-news/ultrasound
    if (req.path.match(/^\/Ultrasound/)) {
      res.redirect(301, '/clinical-news/ultrasound');
    }
    // Path starts with /Artificial-Intelligence to /imaging-informatics/artificial-intelligence
    if (req.path.match(/^\/Artificial-Intelligence/)) {
      res.redirect(301, '/imaging-informatics/artificial-intelligence');
    }
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

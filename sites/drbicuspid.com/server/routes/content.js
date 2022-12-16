const withContent = require('@science-medicine-group/package-global/middleware/with-content');
const contentMeter = require('@science-medicine-group/package-global/middleware/content-meter');
const queryFragment = require('@parameter1/base-cms-marko-web-theme-monorail/graphql/fragments/content-page');
const contact = require('@science-medicine-group/package-global/templates/content/contact');
const { newsletterState, formatContentResponse } = require('@science-medicine-group/package-global/middleware/newsletter-state');
const company = require('../templates/content/company');
const product = require('../templates/content/product');
const whitepaper = require('../templates/content/whitepaper');
const content = require('../templates/content');

const routesList = [
  { // contact
    regex: '/*?contact/:id(\\d{8})*',
    template: contact,
    queryFragment,
  },
  { // company
    regex: '/*?company/:id(\\d{8})*',
    template: company,
    queryFragment,
  },
  { // product
    regex: '/*?product/:id(\\d{8})*',
    template: product,
    queryFragment,
  },
  { // whitepaper
    regex: '/*?whitepaper/:id(\\d{8})*',
    template: whitepaper,
    queryFragment,
  },
  { // default
    regex: '/*?/:id(\\d{8})/*|/:id(\\d{8})(/|$)*',
    template: content,
    queryFragment,
    withContentMeter: true,
  },
];

module.exports = (app) => {
  const { site } = app.locals;
  const contentMeterEnable = site.get('contentMeter.enable');
  // determin to use newsletterstate or contentMeter middleware
  routesList.forEach((route) => {
    if (route.withContentMeter && contentMeterEnable) {
      app.get(route.regex, newsletterState({ setCookie: false }), contentMeter(), withContent({
        template: route.template,
        queryFragment: route.queryFragment,
        formatResponse: formatContentResponse,
      }));
    } else {
      app.get(route.regex, newsletterState({ setCookie: false }), withContent({
        template: route.template,
        queryFragment: route.queryFragment,
        formatResponse: formatContentResponse,
      }));
    }
  });
};

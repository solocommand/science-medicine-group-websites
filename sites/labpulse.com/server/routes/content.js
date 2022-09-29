const withContent = require('@science-medicine-group/package-global/middleware/with-content');
const { newsletterState, formatContentResponse } = require('@science-medicine-group/package-global/middleware/newsletter-state');
const queryFragment = require('@parameter1/base-cms-marko-web-theme-monorail/graphql/fragments/content-page');
const contact = require('@science-medicine-group/package-global/templates/content/contact');
const company = require('../templates/content/company');
const product = require('../templates/content/product');
const whitepaper = require('../templates/content/whitepaper');
const content = require('../templates/content');

module.exports = (app) => {
  app.get('/*?contact/:id(\\d{8})*', newsletterState({ setCookie: false }), newsletterState({ setCookie: false }), withContent({
    template: contact,
    queryFragment,
    formatResponse: formatContentResponse,
  }));

  app.get('/*?company/:id(\\d{8})*', newsletterState({ setCookie: false }), withContent({
    template: company,
    queryFragment,
    formatResponse: formatContentResponse,
  }));

  app.get('/*?product/:id(\\d{8})*', newsletterState({ setCookie: false }), withContent({
    template: product,
    queryFragment,
    formatResponse: formatContentResponse,
  }));

  app.get('/*?whitepaper/:id(\\d{8})*', newsletterState({ setCookie: false }), withContent({
    template: whitepaper,
    queryFragment,
    formatResponse: formatContentResponse,
  }));

  app.get('/*?/:id(\\d{8})/*|/:id(\\d{8})(/|$)', newsletterState({ setCookie: false }), withContent({
    template: content,
    queryFragment,
    formatResponse: formatContentResponse,
  }));
};

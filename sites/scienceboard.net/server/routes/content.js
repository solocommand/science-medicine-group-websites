const withContent = require('@science-medicine-group/package-global/middleware/with-content');
const contentMeter = require('@science-medicine-group/package-global/middleware/content-meter');
const queryFragment = require('@parameter1/base-cms-marko-web-theme-monorail/graphql/fragments/content-page');
const contact = require('@science-medicine-group/package-global/templates/content/contact');
const newsletterState = require('@science-medicine-group/package-global/middleware/newsletter-state');
const company = require('../templates/content/company');
const product = require('../templates/content/product');
const whitepaper = require('../templates/content/whitepaper');
const content = require('../templates/content');

module.exports = (app) => {
  app.get('/*?contact/:id(\\d{8})*', newsletterState(), withContent({
    template: contact,
    queryFragment,
  }));

  app.get('/*?company/:id(\\d{8})*', newsletterState(), withContent({
    template: company,
    queryFragment,
  }));

  app.get('/*?product/:id(\\d{8})*', newsletterState(), withContent({
    template: product,
    queryFragment,
  }));

  app.get('/*?whitepaper/:id(\\d{8})*', newsletterState(), withContent({
    template: whitepaper,
    queryFragment,
  }));

  app.get('/*?/:id(\\d{8})/*|/:id(\\d{8})(/|$)', newsletterState(), contentMeter(), withContent({
    template: content,
    queryFragment,
  }));
};

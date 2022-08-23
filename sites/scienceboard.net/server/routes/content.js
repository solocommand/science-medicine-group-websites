const withContent = require('@science-medicine-group/package-global/middleware/with-content');
const queryFragment = require('@parameter1/base-cms-marko-web-theme-monorail/graphql/fragments/content-page');
const contact = require('@science-medicine-group/package-global/templates/content/contact');
const company = require('../templates/content/company');
const product = require('../templates/content/product');
const whitepaper = require('../templates/content/whitepaper');
const content = require('../templates/content');

module.exports = (app) => {
  app.get('/*?contact/:id(\\d{8})*', withContent({
    template: contact,
    queryFragment,
  }));

  app.get('/*?company/:id(\\d{8})*', withContent({
    template: company,
    queryFragment,
  }));

  app.get('/*?product/:id(\\d{8})*', withContent({
    template: product,
    queryFragment,
  }));

  app.get('/*?whitepaper/:id(\\d{8})*', withContent({
    template: whitepaper,
    queryFragment,
  }));

  app.get('/*?/:id(\\d{8})/*|/:id(\\d{8})(/|$)', withContent({
    template: content,
    queryFragment,
  }));
};

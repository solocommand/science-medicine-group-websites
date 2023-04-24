const withContent = require('@science-medicine-group/package-global/middleware/with-content');
const contentMetering = require('@parameter1/base-cms-marko-web-theme-monorail/middleware/content-metering');
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
];

module.exports = (app) => {
  const { site } = app.locals;

  // Unmetered
  routesList.forEach((route) => {
    app.get(
      route.regex,
      newsletterState({ setCookie: false }),
      withContent({
        template: route.template,
        queryFragment: route.queryFragment,
        formatResponse: formatContentResponse,
      }),
    );
  });

  // Metered
  const config = site.getAsObject('contentMeter');
  app.get(
    '/*?/:id(\\d{8})/*|/:id(\\d{8})(/|$)*',
    newsletterState({ setCookie: false }),
    contentMetering(config),
    withContent({
      template: content,
      queryFragment,
      formatResponse: formatContentResponse,
    }),
  );
};

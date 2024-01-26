const withContent = require('@science-medicine-group/package-global/middleware/with-content');
const contentMetering = require('@parameter1/base-cms-marko-web-theme-monorail/middleware/content-metering');
const qf = require('@parameter1/base-cms-marko-web-theme-monorail/graphql/fragments/content-page');
const contact = require('@science-medicine-group/package-global/templates/content/contact');
const { newsletterState } = require('@science-medicine-group/package-global/middleware/newsletter-state');
// update formatContentResponse to handle idx content access & newsletter state.
const { formatContentResponse } = require('@science-medicine-group/package-global/middleware/format-content-response');
const company = require('../templates/content/company');
const product = require('../templates/content/product');
const whitepaper = require('../templates/content/whitepaper');
const content = require('../templates/content');

module.exports = (app) => {
  const { site } = app.locals;

  // base on site config||USE_LINK_INJECTED_BODY to enable bcl
  const useLinkInjectedBody = site.get('useLinkInjectedBody');
  const queryFragment = qf.factory ? qf.factory({ useLinkInjectedBody }) : qf;

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

const { withWebsiteSection } = require('@parameter1/base-cms-marko-web/middleware');
const queryFragment = require('@parameter1/base-cms-marko-web-theme-monorail/graphql/fragments/website-section-page');
const newsletterState = require('@science-medicine-group/package-global/middleware/newsletter-state');
const home = require('../templates/index');

module.exports = (app) => {
  app.get('/', newsletterState(), withWebsiteSection({
    aliasResolver: () => 'home',
    template: home,
    queryFragment,
  }));
};

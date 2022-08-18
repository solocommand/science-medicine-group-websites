const { withWebsiteSection } = require('@parameter1/base-cms-marko-web/middleware');
const queryFragment = require('@parameter1/base-cms-marko-web-theme-monorail/graphql/fragments/website-section-page');
const itemIdHandler = require('@science-medicine-group/package-global/middleware/item-id-handler');
const newsletterState = require('@science-medicine-group/package-global/middleware/newsletter-state');
const home = require('../templates/index');

module.exports = (app) => {
  app.get('/', itemIdHandler(), newsletterState(), withWebsiteSection({
    aliasResolver: () => 'home',
    template: home,
    queryFragment,
  }));
};

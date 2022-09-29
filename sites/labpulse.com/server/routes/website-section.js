const { withWebsiteSection } = require('@parameter1/base-cms-marko-web/middleware');
const { newsletterState } = require('@science-medicine-group/package-global/middleware/newsletter-state');

const queryFragment = require('@parameter1/base-cms-marko-web-theme-monorail/graphql/fragments/website-section-page');
const upcoming = require('@science-medicine-group/package-global/templates/website-section/upcoming');
const section = require('../templates/website-section');

module.exports = (app) => {
  app.get('/:alias(resources/conferences)', newsletterState(), withWebsiteSection({
    template: upcoming,
    queryFragment,
  }));
  app.get('/:alias([a-z0-9-/]+)', newsletterState(), withWebsiteSection({
    template: section,
    queryFragment,
  }));
};

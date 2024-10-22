const { withWebsiteSection } = require('@parameter1/base-cms-marko-web/middleware');
const queryFragment = require('@parameter1/base-cms-marko-web-theme-monorail/graphql/fragments/website-section-page');

const withPinned = require('@science-medicine-group/package-global/templates/website-section/conference-with-pinned');
const conference = require('@science-medicine-group/package-global/templates/website-section/conference');

const idsAliases = [
  '2025',
];

const cdsAliases = [
  '2025',
];

module.exports = (app) => {
  app.get('/:alias(resources/conferences)', withWebsiteSection({
    template: conference,
    queryFragment,
  }));

  // IDS
  app.get('/:alias(resources/conferences/ids)', (req, res) => {
    res.redirect(301, '/resources/conferences/ids/2025');
  });
  idsAliases.forEach((year) => {
    app.get(`/:alias(resources/conferences/ids/${year})`, withWebsiteSection({
      template: withPinned,
      queryFragment,
    }));
  });

  // CDS
  app.get('/:alias(resources/conferences/cds-midwinter)', (req, res) => {
    res.redirect(301, '/resources/conferences/cds-midwinter/2025');
    cdsAliases.forEach((year) => {
      app.get(`/:alias(resources/conferences/cds-midwinter/${year})`, withWebsiteSection({
        template: withPinned,
        queryFragment,
      }));
    });
  });
};

const { withWebsiteSection } = require('@parameter1/base-cms-marko-web/middleware');
const queryFragment = require('@parameter1/base-cms-marko-web-theme-monorail/graphql/fragments/website-section-page');

const withPinned = require('@science-medicine-group/package-global/templates/website-section/conference-with-pinned');
const conference = require('@science-medicine-group/package-global/templates/website-section/conference');

const ecrAliases = [
  '2024',
];

const ismrmAliases = [
  '2024',
];

const snmmiAliases = [
  '2024',
];

module.exports = (app) => {
  app.get('/:alias(resources/conferences)', withWebsiteSection({
    template: conference,
    queryFragment,
  }));

  // ECR
  app.get('/:alias(resources/conferences/ecr)', (req, res) => {
    res.redirect(301, `/resources/conferences/ecr/${ecrAliases[0]}`);
  });
  ecrAliases.forEach((year) => {
    app.get(`/:alias(resources/conferences/ecr/${year})`, withWebsiteSection({
      template: withPinned,
      queryFragment,
    }));
  });

  // ISMRM
  app.get('/:alias(resources/conferences/ismrm)', (req, res) => {
    res.redirect(301, `/resources/conferences/ismrm/${ismrmAliases[0]}`);
  });
  ismrmAliases.forEach((year) => {
    app.get(`/:alias(resources/conferences/ismrm/${year})`, withWebsiteSection({
      template: withPinned,
      queryFragment,
    }));
  });

  // SNMMI
  app.get('/:alias(resources/conferences/snmmi)', (req, res) => {
    res.redirect(301, `/resources/conferences/snmmi/${snmmiAliases[0]}`);
  });
  snmmiAliases.forEach((year) => {
    app.get(`/:alias(resources/conferences/snmmi/${year})`, withWebsiteSection({
      template: withPinned,
      queryFragment,
    }));
  });
};

const { withWebsiteSection } = require('@parameter1/base-cms-marko-web/middleware');
const queryFragment = require('@parameter1/base-cms-marko-web-theme-monorail/graphql/fragments/website-section-page');

const withPinned = require('../templates/website-section/conference-with-pinned');
const conference = require('../templates/website-section/conference');

const rsnaAliases = [
  '2023',
  '2022',
  '2021',
  '2020',
  '2019',
];

const ecrAliases = [
  '2023',
  '2019',
  '2018',
];

const ismrmAliases = [
  '2022',
  '2021',
  '2020',
  '2019',
];

const ahraAliases = [
  '2022',
  '2021',
];

module.exports = (app) => {
  app.get('/:alias(resources/conference)', withWebsiteSection({
    template: conference,
    queryFragment,
  }));

  // RSNA
  app.get('/:alias(resources/conference/rsna)', (req, res) => {
    res.redirect(301, `/resources/conference/rsna/${rsnaAliases[0]}`);
  });
  rsnaAliases.forEach((year) => {
    app.get(`/:alias(resources/conference/rsna/${year})`, withWebsiteSection({
      template: withPinned,
      queryFragment,
    }));
  });

  // ECR
  app.get('/:alias(resources/conference/ecr)', (req, res) => {
    res.redirect(301, `/resources/conference/ecr/${ecrAliases[0]}`);
  });
  ecrAliases.forEach((year) => {
    app.get(`/:alias(resources/conference/ecr/${year})`, withWebsiteSection({
      template: withPinned,
      queryFragment,
    }));
  });

  // ISMRM
  app.get('/:alias(resources/conference/ismrm)', (req, res) => {
    res.redirect(301, `/resources/conference/ismrm/${ismrmAliases[0]}`);
  });
  ismrmAliases.forEach((year) => {
    app.get(`/:alias(resources/conference/ismrm/${year})`, withWebsiteSection({
      template: withPinned,
      queryFragment,
    }));
  });

  // AHRA
  app.get('/:alias(resources/conference/ahra)', (req, res) => {
    res.redirect(301, `/resources/conference/ahra/${ahraAliases[0]}`);
  });
  ahraAliases.forEach((year) => {
    app.get(`/:alias(resources/conference/ahra/${year})`, withWebsiteSection({
      template: withPinned,
      queryFragment,
    }));
  });
};

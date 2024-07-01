const { withWebsiteSection } = require('@parameter1/base-cms-marko-web/middleware');
const queryFragment = require('@parameter1/base-cms-marko-web-theme-monorail/graphql/fragments/website-section-page');

const withPinned = require('@science-medicine-group/package-global/templates/website-section/conference-with-pinned');
const conference = require('@science-medicine-group/package-global/templates/website-section/conference');

const rsnaAliases = [
  '2023',
  '2022',
  '2021',
  '2020',
  '2019',
];

const ismrmAliases = [
  '2024',
  '2023',
  '2022',
  '2021',
  '2020',
  '2019',
];

const ahraAliases = [
  '2022',
  '2021',
];

const snmmiAliases = [
  '2024',
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
    res.redirect(301, 'https://www.auntminnieeurope.com/resources/conferences/ecr/2024');
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

  // SNMMI
  app.get('/:alias(resources/conference/snmmi)', (req, res) => {
    res.redirect(301, `/resources/conference/snmmi/${snmmiAliases[0]}`);
  });
  snmmiAliases.forEach((year) => {
    app.get(`/:alias(resources/conference/snmmi/${year})`, withWebsiteSection({
      template: withPinned,
      queryFragment,
    }));
  });
};

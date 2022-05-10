const { withContent } = require('@parameter1/base-cms-marko-web/middleware');
const queryFragment = require('@parameter1/base-cms-marko-web-theme-monorail/graphql/fragments/content-page');
const print = require('../templates/content/print');

module.exports = (app) => {
  app.get('/print/content/:id(\\d{8})', withContent({
    template: print,
    queryFragment,
    redirectOnPathMismatch: false,
  }));
};

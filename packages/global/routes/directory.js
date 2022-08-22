const { withWebsiteSection } = require('@parameter1/base-cms-marko-web/middleware');
const MarkoWebSearchConfig = require('@parameter1/base-cms-marko-web-search/config');
const MarkoWebSearch = require('@parameter1/base-cms-marko-web-search');
const queryFragment = require('../graphql/fragments/website-directory-section-page');
const directoryLanding = require('../templates/directory/landing');
const directory = require('../templates/directory/index');

module.exports = (app, rootAlias) => {
  const config = new MarkoWebSearchConfig({
    resultsPerPage: { default: 18 },
    contentTypes: ['Company'],
  });

  const searchMiddleware = (req, res, next) => {
    res.locals.$markoWebSearch = new MarkoWebSearch({
      config,
      query: {
        ...req.query,
      },
    });
    next();
  };

  app.get(`/:alias(${rootAlias})`, searchMiddleware, withWebsiteSection({
    template: directoryLanding,
    queryFragment,
  }));
  app.get(`/:alias(${rootAlias}/[a-z0-9-/]+)`, searchMiddleware, withWebsiteSection({
    template: directory,
    queryFragment,
  }));
};

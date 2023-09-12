const fetch = require('node-fetch');
const { get } = require('@parameter1/base-cms-object-path');
const htmlSitemap = require('@parameter1/base-cms-marko-web-html-sitemap/routes');
const renderBlock = require('@parameter1/base-cms-marko-web-theme-monorail/routes/render-block');
const search = require('@parameter1/base-cms-marko-web-theme-monorail/routes/search');
const taxonomy = require('@parameter1/base-cms-marko-web-theme-monorail/routes/taxonomy');
const braze = require('@science-medicine-group/package-braze/routes');
const feed = require('./feed');
const nativeX = require('./native-x');
const printContent = require('./print-content');
const publicFiles = require('./public-files');
const redirects = require('./redirects');
const staticPage = require('./static-page');

module.exports = (app, siteConfig) => {
  // braze
  braze(app);

  // Feed
  feed(app);

  // NativeX (Story rendering)
  nativeX(app);

  // Shared Print Content
  printContent(app);

  // Shared Public Files (e.g. ads.txt)
  publicFiles(app);

  // Redirects
  redirects(app);

  // Remote component/block loader
  renderBlock(app);

  // Taxonomy pages (for handling redirects from old WP sites)
  taxonomy(app);

  // Search routes
  search(app, siteConfig);

  // Static pages
  staticPage(app);

  // HTML Sitemap
  htmlSitemap(app);

  app.get('/__post-comment', async (req, res) => {
    const wpIcleHostname = get(siteConfig, 'wpIcle.hostname');
    if (wpIcleHostname.match(/my\.auntminnie\.com/)) {
      const requestToForum = await fetch(`https://${wpIcleHostname}/wp-json/smg/v1/forum_comment`, {
        method: 'POST',
        body: JSON.stringify(req.query),
        headers: { 'content-type': 'application/json' },
      });
      const jsonResponse = await requestToForum.json();
      if (get(jsonResponse, 'permalink')) {
        res.redirect(get(jsonResponse, 'permalink'));
      }
    }
    res.redirect(`/${get(req, 'query.uri').split('.com/').pop()}`);
  });
};

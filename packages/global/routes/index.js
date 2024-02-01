const htmlSitemap = require('@parameter1/base-cms-marko-web-html-sitemap/routes');
const renderBlock = require('@parameter1/base-cms-marko-web-theme-monorail/routes/render-block');
const taxonomy = require('@parameter1/base-cms-marko-web-theme-monorail/routes/taxonomy');
const braze = require('@science-medicine-group/package-braze/routes');
const feed = require('./feed');
const nativeX = require('./native-x');
const printContent = require('./print-content');
const publicFiles = require('./public-files');
const redirects = require('./redirects');
const staticPage = require('./static-page');
const googleSearch = require('./google-search');
const search = require('./search');

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

  // Google Search
  googleSearch(app);
};

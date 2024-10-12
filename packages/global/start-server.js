const newrelic = require('newrelic');
const { startServer } = require('@parameter1/base-cms-marko-web');
const { set, get, getAsObject } = require('@parameter1/base-cms-object-path');
const loadInquiry = require('@parameter1/base-cms-marko-web-inquiry');
const htmlSitemapPagination = require('@parameter1/base-cms-marko-web-html-sitemap/middleware/paginated');
const newsletterModalState = require('@parameter1/base-cms-marko-web-theme-monorail/middleware/newsletter-modal-state');
const companySearchHandler = require('@parameter1/base-cms-marko-web-theme-monorail/routes/company-search');
const identityX = require('@parameter1/base-cms-marko-web-identity-x');
const braze = require('@science-medicine-group/package-braze');
const brazeHooks = require('@science-medicine-group/package-braze/hooks');
const maxmindGeoIP = require('@science-medicine-group/package-maxmind-geoip');
const zeroBounce = require('@science-medicine-group/package-zero-bounce');
const setIdxCookie = require('@science-medicine-group/package-braze/middleware/set-idx-cookie');
const confirmUserViaQueryString = require('@science-medicine-group/package-braze/middleware/confirm-user-via-query-string');

const document = require('./components/document');
const components = require('./components');
const fragments = require('./fragments');
const idxRouteTemplates = require('./templates/user');
const sharedRoutes = require('./routes');
const contentGating = require('./middleware/content-gating');
const paginated = require('./middleware/paginated');
const gamTracker = require('./middleware/gam-tracker');
const oembedHandler = require('./oembed-handler');
const redirectHandler = require('./redirect-handler');

const routes = (siteRoutes, siteConfig) => (app) => {
  // Handle submissions on /__inquiry
  loadInquiry(app);
  // Shared/global routes (all sites)
  sharedRoutes(app, siteConfig);
  // Handle request on /__company-search?searchQuery=CompanyName
  companySearchHandler(app);
  // Load site routes
  siteRoutes(app);
};

module.exports = (options = {}) => {
  const { onStart } = options;
  const googleNewsInput = {
    days: 7,
    includeContentTypes: ['Article'],
    excludeLabels: ['Sponsored'],
  };
  return startServer({
    ...options,
    routes: routes(options.routes, options.siteConfig),
    document: options.document || document,
    components: options.components || components,
    fragments: options.fragments || fragments,
    sitemapsHeaders: {
      'x-google-news-input': JSON.stringify(googleNewsInput),
    },
    /** @param {import("express").Application} app */
    onStart: async (app) => {
      if (typeof onStart === 'function') await onStart(app);
      app.set('trust proxy', 'loopback, linklocal, uniquelocal');

      // Set CSP to allow iframing only from BASE.
      app.use((req, res, next) => {
        res.setHeader('X-Frame-Options', 'ALLOW-FROM https://manage.scienceandmedicinegroup.com/');
        res.setHeader('Content-Security-Policy', 'frame-ancestors https://manage.scienceandmedicinegroup.com/');
        next();
      });

      // MaxMind GeoIP setup
      app.use(maxmindGeoIP);

      // Use paginated middleware
      app.use(paginated());

      // Use paginated middleware
      app.use(htmlSitemapPagination());

      // Use newsletterModalState middleware
      app.use(newsletterModalState());

      // Setup GAM.
      const gamConfig = get(options, 'siteConfig.gam');
      set(app.locals, 'GAM', gamConfig);

      // Setup NativeX.
      const nativeXConfig = get(options, 'siteConfig.nativeX');
      set(app.locals, 'nativeX', nativeXConfig);

      // Load braze
      const brazeConfig = getAsObject(options, 'siteConfig.braze');
      braze(app, brazeConfig);

      // Load ZeroBounce (must be loaded before IdX!)
      zeroBounce(app);

      // Load IdentityX
      const idxConfig = get(options, 'siteConfig.identityX');
      identityX(app, idxConfig, { templates: idxRouteTemplates });

      // Confirm an incoming braze_ext_id if present in the URL.
      app.use(confirmUserViaQueryString);

      // Set the idx_idt cookie if a user can be identified
      app.use(setIdxCookie);

      // Add hooks
      brazeHooks(idxConfig, brazeConfig);

      // i18n
      const i18n = (v) => v;
      set(app.locals, 'i18n', options.i18n || i18n);

      // Install custom content gating middleware
      contentGating(app);

      // Must always be loaded last!
      app.use(gamTracker);
    },
    onAsyncBlockError: (e) => newrelic.noticeError(e),
    redirectHandler: redirectHandler(options.redirectHandler),
    embeddedMediaHandlers: {
      oembed: oembedHandler,
    },
  });
};

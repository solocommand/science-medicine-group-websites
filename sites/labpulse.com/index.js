const startServer = require('@science-medicine-group/package-global/start-server');

const pkg = require('./package.json');
const routes = require('./server/routes');
const siteConfig = require('./config/site');
const coreConfig = require('./config/core');
const redirectHandler = require('./redirect-handler');

const { log } = console;

module.exports = startServer({
  rootDir: __dirname,
  website: pkg.website,
  coreConfig,
  siteConfig,
  routes,
  redirectHandler,
}).then(() => log('Website started!')).catch((e) => setImmediate(() => { throw e; }));

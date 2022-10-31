require('./newrelic');

const bootService = require('@parameter1/terminus/boot-service');
const { log } = require('@parameter1/terminus/utils');
const server = require('./server');
const pkg = require('../package.json');
const { PORT, EXPOSED_PORT, HOST } = require('./env');

process.on('unhandledRejection', (e) => {
  throw e;
});

bootService({
  name: pkg.name,
  version: pkg.version,
  server,
  host: HOST,
  port: PORT,
  exposedPort: EXPOSED_PORT,
  onStart: () => {
    log('connect to redis');
  },
  onSignal: () => {
    log('disconnect from redis');
  },
}).catch(e => setImmediate(() => {
  log('bail');
  throw e;
}));

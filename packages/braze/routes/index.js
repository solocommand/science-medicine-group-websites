const ingestApi = require('../ingest');
const preferenceCenter = require('./preference-center');

module.exports = (app) => {
  ingestApi(app);
  preferenceCenter(app);
};

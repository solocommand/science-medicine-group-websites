const ingestApi = require('./ingest-api');
const preferenceCenter = require('./preference-center');

module.exports = (app) => {
  ingestApi(app);
  preferenceCenter(app);
};

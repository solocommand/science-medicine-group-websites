const { ZERO_BOUNCE_API_HOST, ZERO_BOUNCE_API_KEY } = require('./env');
const ZeroBounce = require('./service');

const service = new ZeroBounce({
  apiHost: ZERO_BOUNCE_API_HOST,
  apiKey: ZERO_BOUNCE_API_KEY,
});

module.exports = (app) => {
  app.use((req, res, next) => {
    req.zeroBounce = service;
    res.locals.zeroBounce = service;
    next();
  });
};

const { auth } = require('express-openid-connect');

const {
  AUTH0_BASEURL,
  AUTH0_CLIENTID,
  AUTH0_ISSUER_URL,
  AUTH0_SECRET,
} = process.env;
const { log } = console;

const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: AUTH0_BASEURL,
  clientID: AUTH0_CLIENTID,
  issuerBaseURL: AUTH0_ISSUER_URL,
  secret: AUTH0_SECRET,
  routes: { login: false },
};

module.exports = (app) => {
  if (config.baseURL && config.clientID && config.issuerBaseURL) {
    app.use((req, _, next) => {
      req.auth0Enabled = true;
      next();
    });
    app.use(auth(config));

    // Redirect after login if `returnTo` URL parameter is present.
    app.get('/login', (req, res) => {
      const returnTo = req.query.returnTo || config.baseURL;
      res.oidc.login({ returnTo });
    });
  } else {
    log('Unable to configure Auth0!', config);
  }
};

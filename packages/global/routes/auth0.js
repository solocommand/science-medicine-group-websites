const { getAsObject } = require('@parameter1/base-cms-object-path');
const auth0 = require('@science-medicine-group/package-auth0');

module.exports = (app, siteConfig) => {
  const config = getAsObject(siteConfig, 'auth0');
  auth0(app, config);
};

module.exports = {
  baseURL: process.env.AUTH0_BASEURL,
  clientID: process.env.AUTH0_CLIENTID || 'QTb91mh8hRBOBaerkSjnaqJbY3HY6H9i',
  clientSecret: process.env.AUTH0_SECRET,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASEURL || 'https://login.drbicuspid.com',
  tenant: process.env.AUTH0_TENANT || 'drbicuspid',
  // Set Audience URL for Management API due to custom issuer domain
  apiAudienceURL: process.env.AUTH0_API_AUDIENCE_URL || 'https://drbicuspid.us.auth0.com',
};

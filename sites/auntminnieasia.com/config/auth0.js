module.exports = {
  baseURL: process.env.AUTH0_BASEURL,
  clientID: process.env.AUTH0_CLIENTID || 'zdYzbbVrsAhSgnrYoPHkXWOhFQofxKMa',
  clientSecret: process.env.AUTH0_SECRET,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASEURL || 'https://login.auntminnie.com',
  tenant: process.env.AUTH0_TENANT || 'auntminnie',
  // Set Audience URL for Management API due to custom issuer domain
  apiAudienceURL: process.env.AUTH0_API_AUDIENCE_URL || 'https://auntminnie.us.auth0.com',
};

module.exports = {
  baseURL: process.env.AUTH0_BASEURL,
  clientID: process.env.AUTH0_CLIENTID || '6GhwIT6bvSyzlkjn8h7QhDb6EavxasKo',
  clientSecret: process.env.AUTH0_SECRET,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASEURL || 'https://dev.login.drbicuspid.com',
  // Set Audience URL for Management API due to custom issuer domain
  apiAudienceURL: process.env.AUTH0_API_AUDIENCE_URL || 'https://dev-scienceandmedicinegroup.us.auth0.com',
};

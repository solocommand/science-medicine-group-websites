module.exports = {
  baseURL: process.env.AUTH0_BASEURL,
  clientID: process.env.AUTH0_CLIENTID || 'wc6xJ66CzpMrfS0tjPQhoSGZ99yT6gAb',
  clientSecret: process.env.AUTH0_SECRET,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASEURL || 'https://login.labpulse.com',
  tenant: process.env.AUTH0_TENANT || 'scienceandmedicinegroup',
  // Set Audience URL for Management API due to custom issuer domain
  apiAudienceURL: process.env.AUTH0_API_AUDIENCE_URL || 'https://scienceandmedicinegroup.us.auth0.com',
};

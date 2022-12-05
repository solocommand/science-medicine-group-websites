module.exports = {
  baseURL: process.env.AUTH0_BASEURL,
  clientID: process.env.AUTH0_CLIENTID || 'wc6xJ66CzpMrfS0tjPQhoSGZ99yT6gAb',
  clientSecret: process.env.AUTH0_SECRET,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASEURL || 'https://login.labpulse.com',
};

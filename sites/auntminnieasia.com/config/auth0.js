module.exports = {
  baseURL: process.env.AUTH0_BASEURL,
  clientID: process.env.AUTH0_CLIENTID || 'ZYZ71w4bPDDXkWjrafFH6casl7E0RWQH',
  clientSecret: process.env.AUTH0_SECRET,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASEURL || 'https://dev-scienceandmedicinegroup.us.auth0.com',
  tenant: process.env.AUTH0_TENANT || 'dev-scienceandmedicinegroup',
};

const {
  cleanEnv,
  str,
} = require('envalid');

module.exports = cleanEnv(process.env, {
  IDENTITYX_API_KEY_AM: str({ desc: 'The IdentityX ingest API key for AM' }),
  IDENTITYX_API_KEY_DRB: str({ desc: 'The IdentityX ingest API key for DRB' }),
});

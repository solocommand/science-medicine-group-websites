module.exports = {
  enabled: true,
  hookUri: process.env.WPICLE_HOOK_ENDPOINT || 'http://host.docker.internal:8000/hook/identity-x/user-update',
  endpoint: process.env.WPICLE_ENDPOINT,
  apiKey: process.env.WPICLE_API_KEY,
};

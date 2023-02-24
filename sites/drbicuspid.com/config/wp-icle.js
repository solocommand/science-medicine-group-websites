module.exports = {
  enabled: true,
  hookUri: process.env.WP_ICLE_HOOK_URL || 'http://host.docker.internal:8000/hook/identity-x/user-update',
  apiKey: process.env.WP_ICLE_HOOK_KEY,
};

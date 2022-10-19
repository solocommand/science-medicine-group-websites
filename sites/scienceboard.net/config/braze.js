const config = require('@science-medicine-group/package-global/config/braze');

module.exports = config({
  siteName: 'SAB',
  subscriptionGroups: [
    // @todo read from IdentityX fields! hardcoding for now.
  ],
});

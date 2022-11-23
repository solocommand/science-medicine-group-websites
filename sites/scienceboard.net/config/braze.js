const config = require('@science-medicine-group/package-global/config/braze');

const { log } = console;
log('Create/set unconfirmedGroupId!');

module.exports = config({
  siteName: 'SAB',
  unconfirmedGroupId: '~not-set~',
  appGroupId: '634d62e10ef4e37a75846f41',
});

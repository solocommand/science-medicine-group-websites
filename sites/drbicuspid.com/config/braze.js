const config = require('@science-medicine-group/package-global/config/braze');

const { log } = console;
log('Create/set unconfirmedGroupId!');

module.exports = config({
  siteName: 'DrBicuspid',
  unconfirmedGroupId: '~not-set~',
  appGroupId: '634d67c3ee91fe5375c3bcac',
});

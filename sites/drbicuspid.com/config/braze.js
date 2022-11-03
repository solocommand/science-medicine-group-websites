const config = require('@science-medicine-group/package-global/config/braze');

const { log } = console;
log('Create/set unconfirmedGroupId!');

module.exports = config({
  siteName: 'DrBicuspid',
  unconfirmedGroupId: '~not-set~',
});

const config = require('@science-medicine-group/package-global/config/braze');

const { log } = console;
log('Create/set unconfirmedGroupId!');

module.exports = config({
  siteName: 'AMA',
  unconfirmedGroupId: '~not-set~',
  appGroupId: '634d675d1118243d1113480e',
});

const configureNativeX = require('@science-medicine-group/package-global/config/native-x');

const config = configureNativeX();

config.enabled = false;

config
  .setAliasPlacements('default', [
    { name: 'default', id: '62fbf200d7b5c2000172a1e4' },
  ]);

module.exports = config;

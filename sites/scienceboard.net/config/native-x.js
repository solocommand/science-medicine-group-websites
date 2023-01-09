const configureNativeX = require('@science-medicine-group/package-global/config/native-x');

const config = configureNativeX();

config.enabled = process.env.ENABLE_NATIVE_X === 'true';

config
  .setAliasPlacements('default', [
    { name: 'default', id: '62fbf200d7b5c2000172a1e4' },
  ]);

module.exports = config;

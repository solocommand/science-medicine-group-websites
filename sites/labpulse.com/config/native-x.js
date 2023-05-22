const configureNativeX = require('@science-medicine-group/package-global/config/native-x');

const config = configureNativeX();

config.enabled = process.env.ENABLE_NATIVE_X === 'true';

config
  .setAliasPlacements('default', [
    { name: 'default', id: '62fbe63cd7b5c2000172a0aa' },
    { name: 'related-content', id: '62fbe63cd7b5c2000172a0aa' },
  ]);

module.exports = config;

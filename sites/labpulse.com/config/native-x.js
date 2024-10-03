const configureNativeX = require('@science-medicine-group/package-global/config/native-x');

const config = configureNativeX();

config.enabled = process.env.ENABLE_NATIVE_X === 'true';

config
  .setAliasPlacements('default', [
    { name: 'default', id: '62fbe63cd7b5c2000172a0aa' },
    { name: 'related-content', id: '62fbe63cd7b5c2000172a0aa' },
  ])
  .setAliasPlacements('diagnostic-technologies/senl', [
    { name: 'related-content', id: '6516d232b497bc0001706850' },
  ])
  .setAliasPlacements('demo', [
    { name: 'related-content', id: '66d72ea9b7c9ff459c804dc8' },
  ]);

module.exports = config;

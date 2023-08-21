const configureNativeX = require('@science-medicine-group/package-global/config/native-x');

const config = configureNativeX();

config.enabled = process.env.ENABLE_NATIVE_X === 'true';

config
  .setAliasPlacements('default', [
    { name: 'default', id: '62fce302ffb1230001dca8e7' },
    { name: 'related-content', id: '62fce302ffb1230001dca8e7' },
  ]);

module.exports = config;

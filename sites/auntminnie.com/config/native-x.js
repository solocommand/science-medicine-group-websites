const configureNativeX = require('@science-medicine-group/package-global/config/native-x');

const config = configureNativeX();

config.enabled = process.env.ENABLE_NATIVE_X === 'true';

config
  .setAliasPlacements('default', [
    { name: 'default', id: '62fce200ffb1230001dca815' },
    { name: 'related-content', id: '62fce200ffb1230001dca815' },
  ])
  .setAliasPlacements('cases', [
    { name: 'cases', id: '64e7906396af9a00010dab91' },
  ]);

module.exports = config;

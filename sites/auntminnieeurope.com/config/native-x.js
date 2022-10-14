const configureNativeX = require('@science-medicine-group/package-global/config/native-x');

const config = configureNativeX();

config.enabled = true;

config
  .setAliasPlacements('default', [
    { name: 'default', id: '62fce302ffb1230001dca8e7' },
  ]);

module.exports = config;

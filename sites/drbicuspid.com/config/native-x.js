const configureNativeX = require('@science-medicine-group/package-global/config/native-x');

const config = configureNativeX();

config.enabled = process.env.enable_native_x === 'true';

config
  .setAliasPlacements('default', [
    { name: 'default', id: '62fce264ffb1230001dca87e' },
  ]);

config
  .setAliasPlacements('cases', [
    { name: 'cases', id: '6400e1b493fb8e0001c3a6fb' },
  ]);

module.exports = config;

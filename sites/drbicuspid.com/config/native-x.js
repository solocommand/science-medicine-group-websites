const configureNativeX = require('@science-medicine-group/package-global/config/native-x');

const config = configureNativeX();

config.enabled = process.env.ENABLE_NATIVE_X === 'true';

config
  .setAliasPlacements('default', [
    { name: 'default', id: '62fce264ffb1230001dca87e' },
    // probably need to set this up!
    { name: 'related-content', id: '62fce264ffb1230001dca87e' },
  ])
  .setAliasPlacements('cases', [
    { name: 'cases', id: '6400e1b493fb8e0001c3a6fb' },
  ])
  .setAliasPlacements('dental-specialties/endodontics', [
    { name: 'related-content', id: '6435a1eab91bf50001e2c27b' },
  ])
  .setAliasPlacements('dental-specialties/smile-design', [
    { name: 'related-content', id: '6435a2049eb1640001e88aef' },
  ])
  .setAliasPlacements('digital-dentistry/imaging-cad-cam', [
    { name: 'related-content', id: '644ffa6a9eb164000117db0c' },
  ]);

module.exports = config;

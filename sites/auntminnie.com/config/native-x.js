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
  ])
  .setAliasPlacements('imaging-informatics/advanced-visualization', [
    { name: 'related-content', id: '64e66c30fd16dd0001f6e6ed' },
  ])
  .setAliasPlacements('practice-management/service', [
    { name: 'related-content', id: '64ecf95996af9a00012333ff' },
  ]);

module.exports = config;

const GAMConfiguration = require('@parameter1/base-cms-marko-web-gam/config');

module.exports = ({
  accountId = '22805596119',
  basePath,
} = {}) => {
  const config = new GAMConfiguration(accountId, { basePath });

  config.enableRevealAd = false;

  config
    .setTemplate('LB-STICKY-BOTTOM', {
      size: [
        [970, 90],
        [728, 90],
        [320, 50],
        [300, 50],
      ],
      sizeMapping: [
        { viewport: [980, 0], size: [[970, 90], [728, 90]] },
        { viewport: [750, 0], size: [728, 90] },
        { viewport: [320, 0], size: [[300, 50], [320, 50]] },
      ],
    })
    // .setTemplate('BILLBOARD', {
    //   size: [
    //     [970, 250],
    //     [300, 250],
    //   ],
    //   sizeMapping: [
    //     { viewport: [980, 0], size: [970, 250] },
    //     { viewport: [320, 0], size: [300, 250] },
    //   ],
    // })
    .setTemplate('LEADERBOARD', {
      size: [
        [970, 90],
        [300, 100],
        [300, 250],
        [320, 50],
        [265, 149], // Featured Pushdown / Fluid Banner
      ],
      sizeMapping: [
        { viewport: [980, 0], size: [[970, 250], [265, 149]] },
        { viewport: [750, 0], size: [[265, 149]] },
        { viewport: [300, 0], size: [[300, 250], [265, 149]] },
      ],
    })
    .setTemplate('ROTATION', {
      size: [300, 250],
      sizeMapping: [
        { viewport: [300, 0], size: [300, 250] },
      ],
    })
    .setTemplate('INLINE-CONTENT-MOBILE', {
      size: [300, 250],
      sizeMapping: [
        { viewport: [980, 0], size: [] },
        { viewport: [300, 0], size: [300, 250] },
      ],
    })
    .setTemplate('INLINE-CONTENT-DESKTOP', {
      size: [300, 250],
      sizeMapping: [
        { viewport: [980, 0], size: [300, 250] },
        { viewport: [0, 0], size: [] },
      ],
    });

  return config;
};

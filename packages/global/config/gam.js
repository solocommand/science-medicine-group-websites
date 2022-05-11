const GAMConfiguration = require('@parameter1/base-cms-marko-web-gam/config');

module.exports = ({
  accountId = '1',
  basePath,
} = {}) => {
  const config = new GAMConfiguration(accountId, { basePath });

  config
    .setTemplate('LEADERBOARD', {
      size: [
        [970, 90],
        [728, 90],
        [320, 100],
        [300, 250],
        [320, 50],
        [265, 149], // Featured Pushdown / Fluid Banner
        [1060, 596],
        [736, 414],
        [428, 241],
      ],
      sizeMapping: [
        { viewport: [1070, 0], size: [[970, 90], [728, 90], [265, 149], [1060, 596]] },
        { viewport: [980, 0], size: [[970, 90], [728, 90], [265, 149], [736, 414]] },
        { viewport: [750, 0], size: [[728, 90], [265, 149], [736, 414]] },
        { viewport: [300, 0], size: [[320, 100], [300, 250], [320, 50], [265, 149], [428, 241]] },
      ],
    })
    .setTemplate('ROTATION', {
      size: [[970, 250], [970, 90], [728, 90], [320, 100]],
      sizeMapping: [
        { viewport: [980, 0], size: [[970, 250], [970, 90], [970, 66], [728, 90]] },
        { viewport: [750, 0], size: [[728, 90], [300, 250]] },
        { viewport: [300, 0], size: [[300, 50], [300, 250], [320, 100]] },
      ],
    })
    .setTemplate('INLINE-CONTENT-MOBILE', {
      size: [[970, 250], [970, 90], [728, 90], [320, 100]],
      sizeMapping: [
        { viewport: [980, 0], size: [] },
        { viewport: [300, 0], size: [[300, 50], [300, 250], [320, 100]] },
      ],
    })
    .setTemplate('INLINE-CONTENT-DESKTOP', {
      size: [[970, 250], [970, 90], [728, 90], [320, 100]],
      sizeMapping: [
        { viewport: [980, 0], size: [[970, 250], [970, 90], [970, 66], [728, 90]] },
        { viewport: [750, 0], size: [[728, 90], [300, 250]] },
        { viewport: [0, 0], size: [] },
      ],
    });

  return config;
};

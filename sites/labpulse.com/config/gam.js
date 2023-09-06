const configureGAM = require('@science-medicine-group/package-global/config/gam');

const config = configureGAM({ basePath: 'lab' });

config.enableRevealAd = true;

config.lazyLoad = {
  enabled: true, // set to true to enable lazy loading
  fetchMarginPercent: 100, // fetch ad when one viewport away
  renderMarginPercent: 50, // render ad when half viewport away
  mobileScaling: 2, // double these on mobile
};

config.setAliasAdUnits('default', [
  { name: 'lb-sticky-bottom', templateName: 'LB-STICKY-BOTTOM', path: 'leaderboard' },
  { name: 'leaderboard', templateName: 'LEADERBOARD', path: 'leaderboard' },
  { name: 'rotation', templateName: 'ROTATION', path: 'rotation' },
  { name: 'inline-content-mobile', templateName: 'INLINE-CONTENT-MOBILE', path: 'rotation' },
  { name: 'inline-content-desktop', templateName: 'INLINE-CONTENT-DESKTOP', path: 'rotation' },
  // Below based on enableRevealAd
  { name: 'reskin', path: 'reskin' },
  { name: 'reskin-mobile', templateName: 'RESKIN-MOBILE', path: 'reskin' },
]);

const aliases = [
  { alias: 'business-insights' },
  { alias: 'diagnostic-technologies' },
  { alias: 'diseases' },
  { alias: 'point-of-care-testing' },
  { alias: 'research-and-development' },
  { alias: 'resources/whitepapers' },
];

aliases.forEach(({ alias, prefix = alias }) => config.setAliasAdUnits(alias, [
  { name: 'lb-sticky-bottom', templateName: 'LB-STICKY-BOTTOM', path: `${prefix}-leaderboard` },
  { name: 'leaderboard', templateName: 'LEADERBOARD', path: `${prefix}-leaderboard` },
  { name: 'rotation', templateName: 'ROTATION', path: `${prefix}-rotation` },
  { name: 'inline-content-mobile', templateName: 'INLINE-CONTENT-MOBILE', path: `${prefix}-rotation` },
  { name: 'inline-content-desktop', templateName: 'INLINE-CONTENT-DESKTOP', path: `${prefix}-rotation` },
  { name: 'reskin', path: `${prefix}-reskin` },
  { name: 'reskin-mobile', templateName: 'RESKIN-MOBILE', path: `${prefix}-reskin` },
]));

module.exports = config;

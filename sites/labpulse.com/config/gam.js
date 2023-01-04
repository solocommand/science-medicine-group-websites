const configureGAM = require('@science-medicine-group/package-global/config/gam');

const config = configureGAM({ basePath: 'lab' });

config.lazyLoad = {
  enabled: true, // set to true to enable lazy loading
  fetchMarginPercent: 100, // fetch ad when one viewport away
  renderMarginPercent: 50, // render ad when half viewport away
  mobileScaling: 2, // double these on mobile
};

config.setAliasAdUnits('default', [
  { name: 'lb-sticky-bottom', templateName: 'LB-STICKY-BOTTOM', path: 'leaderboard' },
  { name: 'billboard', templateName: 'BILLBOARD', path: 'billboard' },
  { name: 'leaderboard', templateName: 'LEADERBOARD', path: 'leaderboard' },
  { name: 'rotation', templateName: 'ROTATION', path: 'rotation' },
  { name: 'inline-content-mobile', templateName: 'INLINE-CONTENT-MOBILE', path: 'rotation' },
  { name: 'inline-content-desktop', templateName: 'INLINE-CONTENT-DESKTOP', path: 'rotation' },
  // Below based on enableRevealAd
  { name: 'reskin', path: 'reskin' },
]);

const aliases = [
  'business-insights',
  'diagnostic-technologies',
  'diseases',
  'point-of-care-testing',
  'research-and-development',
];

aliases.forEach(alias => config.setAliasAdUnits(alias, [
  { name: 'leaderboard', templateName: 'LEADERBOARD', path: `${alias}-leaderboard` },
  { name: 'billboard', templateName: 'BILLBOARD', path: `${alias}-billboard` },
  { name: 'rotation', templateName: 'ROTATION', path: `${alias}-rotation` },
  { name: 'inline-content-mobile', templateName: 'INLINE-CONTENT-MOBILE', path: `${alias}-rotation` },
  { name: 'inline-content-desktop', templateName: 'INLINE-CONTENT-DESKTOP', path: `${alias}-rotation` },
]));


module.exports = config;

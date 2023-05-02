const configureGAM = require('@science-medicine-group/package-global/config/gam');

const config = configureGAM({ basePath: 'drb' });

config.enableRevealAd = true;

config.lazyLoad = {
  enabled: true, // set to true to enable lazy loading
  fetchMarginPercent: 100, // fetch ad when one viewport away
  renderMarginPercent: 50, // render ad when half viewport away
  mobileScaling: 2, // double these on mobile
};

config.setAliasAdUnits('default', [
  { name: 'lb-sticky-bottom', templateName: 'LB-STICKY-BOTTOM', path: 'sticky-footer' },
  { name: 'leaderboard', templateName: 'LEADERBOARD', path: 'leaderboard' },
  { name: 'rotation', templateName: 'ROTATION', path: 'rotation' },
  { name: 'inline-content-mobile', templateName: 'INLINE-CONTENT-MOBILE', path: 'rotation' },
  { name: 'inline-content-desktop', templateName: 'INLINE-CONTENT-DESKTOP', path: 'rotation' },
  // Below based on enableRevealAd
  { name: 'reskin', path: 'reskin' },
]);

const aliases = [
  { alias: 'case-of-the-x' },
  { alias: 'jobs' },
  { alias: 'dental-practice/dental-assistant', prefix: 'dental-assistant' },
  { alias: 'dental-practice/legal-issues', prefix: 'legal-issues' },
  { alias: 'dental-practice/office-management', prefix: 'office-management' },
  { alias: 'dental-practice/patient-communication', prefix: 'patient-communication' },
  { alias: 'dental-practice/public-health', prefix: 'public-health' },
  { alias: 'dental-practice/wellness', prefix: 'wellness' },
  { alias: 'dental-specialties/endodontics', prefix: 'endodontics' },
  { alias: 'dental-specialties/oral-maxillofacial-surgery', prefix: 'oral-maxillofacial-surgery' },
  { alias: 'dental-specialties/smile-design', prefix: 'smile-design' },
  { alias: 'dental-specialties/orofacial-pain', prefix: 'orofacial-pain' },
  { alias: 'digital-dentistry/imaging', prefix: 'imaging' },
  { alias: 'digital-dentistry/imaging-cad-cam', prefix: 'imaging-cad-cam' },
  { alias: 'dental-hygiene', prefix: 'dental-hygiene' },
];

aliases.forEach(({ alias, prefix = alias }) => config.setAliasAdUnits(alias, [
  { name: 'lb-sticky-bottom', templateName: 'LB-STICKY-BOTTOM', path: `${prefix}-sticky-footer` },
  { name: 'leaderboard', templateName: 'LEADERBOARD', path: `${prefix}-leaderboard` },
  { name: 'rotation', templateName: 'ROTATION', path: `${prefix}-rotation` },
  { name: 'inline-content-mobile', templateName: 'INLINE-CONTENT-MOBILE', path: `${prefix}-rotation` },
  { name: 'inline-content-desktop', templateName: 'INLINE-CONTENT-DESKTOP', path: `${prefix}-rotation` },
  { name: 'reskin', path: `${prefix}-reskin` },
]));

module.exports = config;

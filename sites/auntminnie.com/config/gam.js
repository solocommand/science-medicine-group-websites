const configureGAM = require('@science-medicine-group/package-global/config/gam');

const config = configureGAM({ basePath: 'am' });

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
  { name: 'reskin-mobile', templateName: 'RESKIN-MOBILE', path: 'reskin' },
]);

const aliases = [
  { alias: 'clinical-news' },
  { alias: 'clinical-news/ct', prefix: 'ct' },
  { alias: 'clinical-news/digital-x-ray', prefix: 'digital-x-ray' },
  { alias: 'clinical-news/interventional', prefix: 'interventional' },
  { alias: 'clinical-news/molecular-imaging', prefix: 'molecular-imaging' },
  { alias: 'clinical-news/mri', prefix: 'mri' },
  { alias: 'clinical-news/radiation-oncology-therapy', prefix: 'radiation-oncology-therapy' },
  { alias: 'clinical-news/ultrasound', prefix: 'ultrasound' },
  { alias: 'clinical-news/womens-imaging', prefix: 'womens-imaging' },
  { alias: 'senl' },
  { alias: 'leveraging-vnas', prefix: 'senl' },
  { alias: 'improving-radiology-efficiency-and-outcomes', prefix: 'senl' },
  { alias: 'imaging-informatics' },
  { alias: 'imaging-informatics/advanced-visualization', prefix: 'advanced-visualization' },
  { alias: 'imaging-informatics/enterprise-imaging', prefix: 'enterprise-imaging' },
  { alias: 'imaging-informatics/artificial-intelligence', prefix: 'artificial-intelligence' },
  { alias: 'imaging-informatics/cybersecurity', prefix: 'cybersecurity' },
  { alias: 'industry-news' },
  { alias: 'industry-news/installations', prefix: 'installations' },
  { alias: 'industry-news/product-news', prefix: 'product-news' },
  { alias: 'industry-news/ma', prefix: 'ma' },
  { alias: 'industry-news/market-analysis', prefix: 'market-analysis' },
  { alias: 'industry-news/regulatory', prefix: 'regulatory' },
  { alias: 'practice-management' },
  { alias: 'practice-management/administration', prefix: 'administration' },
  { alias: 'practice-management/associations', prefix: 'associations' },
  { alias: 'practice-management/careers', prefix: 'careers' },
  { alias: 'practice-management/equity-inclusion', prefix: 'equity-inclusion' },
  { alias: 'practice-management/medicolegal', prefix: 'medicolegal' },
  { alias: 'practice-management/patient-safety', prefix: 'patient-safety' },
  { alias: 'practice-management/radiologic-technologist', prefix: 'radiologic-technologist' },
  { alias: 'practice-management/service', prefix: 'service' },
  { alias: 'radiology-education' },
  { alias: 'radiology-education/medical-students', prefix: 'medical-students' },
  { alias: 'radiology-education/residents-fellows', prefix: 'residents-fellows' },
  { alias: 'subspecialties' },
  { alias: 'subspecialties/interventional-radiology', prefix: 'interventional' },
  { alias: 'subspecialties/nuclear-radiology', prefix: 'molecular-imaging' },
  { alias: 'subspecialties/radiation-oncology', prefix: 'radiation-oncology-therapy' },
  { alias: 'subspecialties/breast-imaging', prefix: 'womens-imaging' },
  { alias: 'resources/conference/rsna/2023', prefix: '2023' },
  { alias: 'resources/conference/ecr/2024', prefix: '2024' },
  { alias: 'resources/conference/ismrm/2024', prefix: 'ismrm-2024' },
  { alias: 'resources/webinars' },
  { alias: 'resources/vendors' },
  { alias: 'resources/conference/snmmi/2024', prefix: 'snmmi-2024' },
];

aliases.forEach(({ alias, prefix = alias }) => config.setAliasAdUnits(alias, [
  { name: 'lb-sticky-bottom', templateName: 'LB-STICKY-BOTTOM', path: `${prefix}-sticky-footer` },
  { name: 'leaderboard', templateName: 'LEADERBOARD', path: `${prefix}-leaderboard` },
  { name: 'rotation', templateName: 'ROTATION', path: `${prefix}-rotation` },
  { name: 'inline-content-mobile', templateName: 'INLINE-CONTENT-MOBILE', path: `${prefix}-rotation` },
  { name: 'inline-content-desktop', templateName: 'INLINE-CONTENT-DESKTOP', path: `${prefix}-rotation` },
  { name: 'reskin', path: `${prefix}-reskin` },
  { name: 'reskin-mobile', templateName: 'RESKIN-MOBILE', path: `${prefix}-reskin` },
]));

module.exports = config;

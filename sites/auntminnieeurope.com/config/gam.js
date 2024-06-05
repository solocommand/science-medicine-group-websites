const configureGAM = require('@science-medicine-group/package-global/config/gam');

const config = configureGAM({ basePath: 'ame' });

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
  { alias: 'imaging-informatics' },
  { alias: 'imaging-informatics/enterprise-imaging', prefix: 'enterprise-imaging' },
  { alias: 'imaging-informatics/artificial-intelligence', prefix: 'artificial-intelligence' },
  { alias: 'imaging-informatics/cybersecurity', prefix: 'cybersecurity' },
  { alias: 'imaging-informatics/advanced-visualization', prefix: 'advanced-visualization' },
  { alias: 'industry-news' },
  { alias: 'industry-news/product-news', prefix: 'product-news' },
  { alias: 'industry-news/regulatory', prefix: 'regulatory' },
  { alias: 'industry-news/ma', prefix: 'ma' },
  { alias: 'industry-news/market-analysis', prefix: 'market-analysis' },
  { alias: 'industry-news/installations', prefix: 'installations' },
  { alias: 'medical-legal-and-practice' },
  { alias: 'medical-legal-and-practice/health-equity', prefix: 'health-equity' },
  { alias: 'medical-legal-and-practice/socioeconomic', prefix: 'socioeconomic' },
  { alias: 'medical-legal-and-practice/medicolegal-issues', prefix: 'medicolegal-issues' },
  { alias: 'medical-legal-and-practice/organized-radiology-issues', prefix: 'organized-radiology-issues' },
  { alias: 'medical-legal-and-practice/patient-safety', prefix: 'patient-safety' },
  { alias: 'medical-legal-and-practice/service', prefix: 'service' },
  { alias: 'medical-legal-and-practice/tributes-obits', prefix: 'tributes-obits' },
  { alias: 'editorial-advisory-board' },
  { alias: 'radiographers' },
  { alias: 'radiographers/sonographer', prefix: 'sonographer' },
  { alias: 'radiology-education' },
  { alias: 'radiology-education/medical-students', prefix: 'medical-students' },
  { alias: 'radiology-education/residents-fellows', prefix: 'residents-fellows' },
  { alias: 'subspecialties' },
  { alias: 'subspecialties/breast-imaging', prefix: 'womens-imaging' },
  { alias: 'subspecialties/interventional-radiology', prefix: 'interventional-radiology' },
  { alias: 'subspecialties/nuclear-radiology', prefix: 'nuclear-radiology' },
  { alias: 'subspecialties/radiation-oncology', prefix: 'radiation-oncology' },
  { alias: 'resources/webinars' },
  { alias: 'resources/conferences/ecr/2024', prefix: '2024' },
  { alias: 'resources/conferences/ismrm/2024', prefix: 'ismrm-2024' },
  { alias: 'resources/conferences/snmmi/2024', prefix: 'snmmi-2024' },
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

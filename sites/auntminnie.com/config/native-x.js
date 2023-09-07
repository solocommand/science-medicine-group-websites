const configureNativeX = require('@science-medicine-group/package-global/config/native-x');

const config = configureNativeX();

config.enabled = process.env.ENABLE_NATIVE_X === 'true';

config
  .setAliasPlacements('default', [
    { name: 'default', id: '62fce200ffb1230001dca815' },
    { name: 'related-content', id: '62fce200ffb1230001dca815' },
  ])

  // CASES PLACEMENT
  .setAliasPlacements('cases', [
    { name: 'cases', id: '64e7906396af9a00010dab91' },
  ])

  // IMAGING INFORMATICS PLACEMENTS
  .setAliasPlacements('imaging-informatics/advanced-visualization', [
    { name: 'related-content', id: '64e66c30fd16dd0001f6e6ed' },
  ])
  .setAliasPlacements('imaging-informatics/artificial-intelligence', [
    { name: 'related-content', id: '64f874a796af9a0001518310' },
  ])
  .setAliasPlacements('imaging-informatics/enterprise-imaging', [
    { name: 'related-content', id: '64f87b0cfd16dd000140f18f' },
  ])
  .setAliasPlacements('imaging-informatics/cybersecurity', [
    { name: 'related-content', id: '64f87b1f96af9a000151981e' },
  ])

  // PRACTICE MANAGEMENT PLACEMENTS
  .setAliasPlacements('practice-management/service', [
    { name: 'related-content', id: '64ecf95996af9a00012333ff' },
  ])
  .setAliasPlacements('practice-management/administration', [
    { name: 'related-content', id: '64f87af8fd16dd000140f13e' },
  ])
  .setAliasPlacements('practice-management/associations', [
    { name: 'related-content', id: '64f87ae696af9a00015196f7' },
  ])
  .setAliasPlacements('practice-management/careers', [
    { name: 'related-content', id: '64f87acefd16dd000140f096' },
  ])
  .setAliasPlacements('practice-management/equity-inclusion', [
    { name: 'related-content', id: '64f87abcfd16dd000140f007' },
  ])
  .setAliasPlacements('practice-management/medicolegal', [
    { name: 'related-content', id: '64f87aa9fd16dd000140efc3' },
  ])
  .setAliasPlacements('practice-management/patient-safety', [
    { name: 'related-content', id: '64f87a3bfd16dd000140eead' },
  ])
  .setAliasPlacements('practice-management/radiologic-technologist', [
    { name: 'related-content', id: '64f87a24fd16dd000140ee51' },
  ])

  // CLINICAL NEWS PLACEMENTS
  .setAliasPlacements('clinical-news/mri', [
    { name: 'related-content', id: '64ef7e0afd16dd00011d0edf' },
  ])
  .setAliasPlacements('clinical-news/digital-x-ray', [
    { name: 'related-content', id: '64ef7e86fd16dd00011d107b' },
  ])
  .setAliasPlacements('clinical-news/molecular-imaging', [
    { name: 'related-content', id: '64f0daabfd16dd0001226ae6' },
  ])
  .setAliasPlacements('clinical-news/ct', [
    { name: 'related-content', id: '64f874c0fd16dd000140dd02' },
  ])
  .setAliasPlacements('clinical-news/ultrasound', [
    { name: 'related-content', id: '64f874d196af9a00015183a2' },
  ])
  .setAliasPlacements('clinical-news/womens-imaging', [
    { name: 'related-content', id: '64f874e396af9a0001518404' },
  ])
  .setAliasPlacements('clinical-news/interventional', [
    { name: 'related-content', id: '64f87a0196af9a00015193ce' },
  ])
  .setAliasPlacements('clinical-news/radiation-oncology-therapy', [
    { name: 'related-content', id: '64f879edfd16dd000140ed8f' },
  ])

  // INDUSTRY NEWS PLACEMENTS
  .setAliasPlacements('industry-news/installations', [
    { name: 'related-content', id: '64f879d296af9a0001519337' },
  ])
  .setAliasPlacements('industry-news/product-news', [
    { name: 'related-content', id: '64f879c0fd16dd000140ecfe' },
  ])
  .setAliasPlacements('industry-news/regulatory', [
    { name: 'related-content', id: '64f879a0fd16dd000140ec95' },
  ])
  .setAliasPlacements('industry-news/ma', [
    { name: 'related-content', id: '64f8798a96af9a000151921f' },
  ])
  .setAliasPlacements('industry-news/market-analysis', [
    { name: 'related-content', id: '64f8797896af9a00015191ec' },
  ])

  // RADIOLOGY EDUCATION PLACEMENTS
  .setAliasPlacements('radiology-education/medical-students', [
    { name: 'related-content', id: '64f87965fd16dd000140eb87' },
  ])
  .setAliasPlacements('radiology-education/residents-fellows', [
    { name: 'related-content', id: '64f8795396af9a0001519163' },
  ])

  // SUBSPECIALTIES PLACEMENTS
  .setAliasPlacements('subspecialties/interventional-radiology', [
    { name: 'related-content', id: '64f9fd1efd16dd0001487001' },
  ])
  .setAliasPlacements('subspecialties/nuclear-radiology', [
    { name: 'related-content', id: '64f9fd2a96af9a00015916ca' },
  ])
  .setAliasPlacements('subspecialties/radiation-oncology', [
    { name: 'related-content', id: '64f9fd3996af9a00015916ef' },
  ])
  .setAliasPlacements('subspecialties/breast-imaging', [
    { name: 'related-content', id: '64f9fd46fd16dd00014870a3' },
  ]);

module.exports = config;

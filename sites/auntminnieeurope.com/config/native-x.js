const configureNativeX = require('@science-medicine-group/package-global/config/native-x');

const config = configureNativeX();

config.enabled = process.env.ENABLE_NATIVE_X === 'true';

config
  .setAliasPlacements('default', [
    { name: 'default', id: '62fce302ffb1230001dca8e7' },
    { name: 'related-content', id: '62fce302ffb1230001dca8e7' },
  ])

  // CASES PLACEMENT
  .setAliasPlacements('cases', [
    { name: 'cases', id: '6552593321b7580001b9e165' },
  ])

  // CLINICAL NEWS PLACEMENTS
  .setAliasPlacements('clinical-news/mri', [
    { name: 'related-content', id: '65525a90ce30e70001a87abd' },
  ])
  .setAliasPlacements('clinical-news/digital-x-ray', [
    { name: 'related-content', id: '65525abd21b7580001b9e2f9' },
  ])
  .setAliasPlacements('clinical-news/molecular-imaging', [
    { name: 'related-content', id: '65525adc21b7580001b9e325' },
  ])
  .setAliasPlacements('clinical-news/ct', [
    { name: 'related-content', id: '65525af4ce30e70001a87b5f' },
  ])
  .setAliasPlacements('clinical-news/ultrasound', [
    { name: 'related-content', id: '65525b0dce30e70001a87b87' },
  ])
  .setAliasPlacements('clinical-news/womens-imaging', [
    { name: 'related-content', id: '65525b2821b7580001b9e3bb' },
  ])
  .setAliasPlacements('clinical-news/interventional', [
    { name: 'related-content', id: '65525b4321b7580001b9e3f3' },
  ])
  .setAliasPlacements('clinical-news/radiation-oncology-therapy', [
    { name: 'related-content', id: '65525bbf21b7580001b9e454' },
  ])

  // IMAGING INFORMATICS PLACEMENTS
  .setAliasPlacements('imaging-informatics/advanced-visualization', [
    { name: 'related-content', id: '6552597b21b7580001b9e1bf' },
  ])
  .setAliasPlacements('imaging-informatics/artificial-intelligence', [
    { name: 'related-content', id: '655259a221b7580001b9e1f9' },
  ])
  .setAliasPlacements('imaging-informatics/enterprise-imaging', [
    { name: 'related-content', id: '655259c2ce30e70001a87a1e' },
  ])
  .setAliasPlacements('imaging-informatics/cybersecurity', [
    { name: 'related-content', id: '655259dfce30e70001a87a54' },
  ])

  // INDUSTRY NEWS PLACEMENTS
  .setAliasPlacements('industry-news/installations', [
    { name: 'related-content', id: '65525c1221b7580001b9e49f' },
  ])
  .setAliasPlacements('industry-news/product-news', [
    { name: 'related-content', id: '65525c2dce30e70001a87c79' },
  ])
  .setAliasPlacements('industry-news/regulatory', [
    { name: 'related-content', id: '65525c49ce30e70001a87ca3' },
  ])
  .setAliasPlacements('industry-news/ma', [
    { name: 'related-content', id: '65525c62ce30e70001a87cd8' },
  ])
  .setAliasPlacements('industry-news/market-analysis', [
    { name: 'related-content', id: '65525c7bce30e70001a87d05' },
  ])

  // MEDICAL LEGAL & PRACTICE PLACEMENTS
  .setAliasPlacements('medical-legal-and-practice/health-equity', [
    { name: 'related-content', id: '6552765fce30e70001a88685' },
  ])
  .setAliasPlacements('medical-legal-and-practice/socioeconomic', [
    { name: 'related-content', id: '655276b0ce30e70001a886de' },
  ])
  .setAliasPlacements('medical-legal-and-practice/medicolegal-issues', [
    { name: 'related-content', id: '655276c121b7580001b9eecd' },
  ])
  .setAliasPlacements('medical-legal-and-practice/organized-radiology-issues', [
    { name: 'related-content', id: '655276d6ce30e70001a88709' },
  ])
  .setAliasPlacements('medical-legal-and-practice/patient-safety', [
    { name: 'related-content', id: '655276e421b7580001b9ef07' },
  ])
  .setAliasPlacements('medical-legal-and-practice/service', [
    { name: 'related-content', id: '655276f5ce30e70001a8874b' },
  ])
  .setAliasPlacements('medical-legal-and-practice/tributes-obits', [
    { name: 'related-content', id: '6552770521b7580001b9ef31' },
  ])

  // EDITORIAL ADVISORY BOARD
  .setAliasPlacements('editorial-advisory-board', [
    { name: 'related-content', id: '6552772521b7580001b9ef77' },
  ])

  // RADIOGRAPHERS PLACEMENTS
  .setAliasPlacements('radiographers/sonographer', [
    { name: 'related-content', id: '6552774fce30e70001a887d6' },
  ])

  // RADIOLOGY EDUCATION PLACEMENTS
  .setAliasPlacements('radiology-education/medical-students', [
    { name: 'related-content', id: '6552776121b7580001b9efc6' },
  ])
  .setAliasPlacements('radiology-education/residents-fellows', [
    { name: 'related-content', id: '6552777121b7580001b9efda' },
  ])

  // SUBSPECIALTIES PLACEMENTS
  .setAliasPlacements('subspecialties/breast-imaging', [
    { name: 'related-content', id: '65525ee521b7580001b9e634' },
  ])
  // .setAliasPlacements('subspecialties/cardiovascular-radiology', [
  //   { name: 'related-content', id: '65525f2321b7580001b9e682' },
  // ])
  // .setAliasPlacements('subspecialties/chest-radiology', [
  //   { name: 'related-content', id: '655260e621b7580001b9e71f' },
  // ])
  // .setAliasPlacements('subspecialties/emergency-radiology', [
  //   { name: 'related-content', id: '6552610821b7580001b9e75e' },
  // ])
  // .setAliasPlacements('subspecialties/gastrointestinal-radiology', [
  //   { name: 'related-content', id: '65527508ce30e70001a8846c' },
  // ])
  // .setAliasPlacements('subspecialties/genitourinary-radiology', [
  //   { name: 'related-content', id: '6552752bce30e70001a884b2' },
  // ])
  // .setAliasPlacements('subspecialties/head-and-neck-radiology', [
  //   { name: 'related-content', id: '65527548ce30e70001a884ec' },
  // ])
  .setAliasPlacements('subspecialties/interventional-radiology', [
    { name: 'related-content', id: '65527569ce30e70001a8851f' },
  ])
  // .setAliasPlacements('subspecialties/medical-physics', [
  //   { name: 'related-content', id: '6552758321b7580001b9ece3' },
  // ])
  // .setAliasPlacements('subspecialties/musculoskeletal-radiology', [
  //   { name: 'related-content', id: '655275a0ce30e70001a88578' },
  // ])
  // .setAliasPlacements('subspecialties/neuroradiology', [
  //   { name: 'related-content', id: '655275c2ce30e70001a885a7' },
  // ])
  .setAliasPlacements('subspecialties/nuclear-radiology', [
    { name: 'related-content', id: '655275df21b7580001b9eda0' },
  ])
  // .setAliasPlacements('subspecialties/pediatric-radiology', [
  //   { name: 'related-content', id: '655275fbce30e70001a88621' },
  // ])
  .setAliasPlacements('subspecialties/radiation-oncology', [
    { name: 'related-content', id: '65527621ce30e70001a88654' },
  ])
  .setAliasPlacements('demo', [
    { name: 'related-content', id: '66d72ebafeb239558f0e8eb1' },
  ]);

module.exports = config;

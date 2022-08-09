const navigation = require('./navigation');
const contentMeter = require('./content-meter');
const gam = require('./gam');
const nativeX = require('./native-x');
const identityX = require('./identity-x');
const newsletter = require('./newsletter');
const search = require('./search');

module.exports = {
  navigation,
  contentMeter,
  gam,
  nativeX,
  identityX,
  idxNavItems: {
    enable: process.env.IDX_NAV_ENABLE || false,
  },
  newsletter,
  search,
  company: 'Science and Medicine Group',
  p1events: {
    tenant: 'smg',
    enabled: true,
    cookieDomain: process.env.NODE_ENV === 'production' ? 'labpulse.com' : '',
  },
  logos: {
    navbar: {
      src: 'https://img.labpulse.com/files/base/smg/all/image/static/lab/lab-logo.svg?h=45&auto=format,compress',
      srcset: [
        'https://img.labpulse.com/files/base/smg/all/image/static/lab/lab-logo.svg?h=90&auto=format,compress 2x',
      ],
    },
    footer: {
      src: 'https://img.labpulse.com/files/base/smg/all/image/static/lab/lab-logo.svg?h=60&auto=format,compress',
      srcset: [
        'https://img.labpulse.com/files/base/smg/all/image/static/lab/lab-logo.svg?h=120&auto=format,compress 2x',
      ],
    },
    corporate: {
      alt: 'Science and Medicine Group Logo',
      href: 'https://scienceandmedicinegroup.com',
      src: 'https://img.labpulse.com/files/base/smg/all/image/static/smg-logo.png?w=200&auto=format,compress',
      srcset: [
        'https://img.labpulse.com/files/base/smg/all/image/static/smg-logo.png?w=200&auto=format,compress&dpr=2 2x',
      ],
    },
  },
  socialMediaLinks: [
    { provider: 'facebook', href: 'https://www.facebook.com/LabPulse', target: '_blank' },
    { provider: 'twitter', href: 'https://twitter.com/LabPulse1', target: '_blank' },
    { provider: 'linkedin', href: 'https://www.linkedin.com/company/labpulse/', target: '_blank' },
  ],
  podcastLinks: [],
  gcse: {
    id: 'NOT_SET',
  },
  gtm: {
    containerId: 'GTM-W5TZ4SS',
  },
  // wufoo: {
  //   userName: 'randallreilly',
  // },
  inquiry: {
    enabled: false,
    directSend: false,
    sendTo: 'support@parameter1.com',
    sendFrom: 'LabPulse.com <noreply@parameter1.com>',
    logo: 'https://img.labpulse.com/files/base/smg/all/image/static/lab/lab-logo.svg?h=45&auto=format,compress&bg=000000&pad=5',
    bgColor: '#000000',
  },
  setSearchSortFieldToScore: true,
};

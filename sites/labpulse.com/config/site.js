const braze = require('./braze');
const contentMeter = require('./content-meter');
const gam = require('./gam');
const identityX = require('./identity-x');
const nativeX = require('./native-x');
const navigation = require('./navigation');
const newsletter = require('./newsletter');
const search = require('./search');

module.exports = {
  // Module configs
  braze,
  contentMeter,
  gam,
  identityX,
  nativeX,
  navigation,
  newsletter,
  search,
  // Site configs
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
      width: '158',
      height: '35',
    },
    footer: {
      src: 'https://img.labpulse.com/files/base/smg/all/image/static/lab/lab-logo.svg?h=60&auto=format,compress',
      srcset: [
        'https://img.labpulse.com/files/base/smg/all/image/static/lab/lab-logo.svg?h=120&auto=format,compress 2x',
      ],
      width: '204',
      height: '45',
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
  wufoo: {
    userName: 'labpulse',
    'contact-us': {
      title: 'Drop us a line!',
      hash: 'mbaniw419houf4',
    },
    'resources/conferences': {
      title: 'Submit A Conference!',
      hash: 'z1op3s8517hgdmv',
    },
  },
  inquiry: {
    enabled: true,
    directSend: false,
    sendTo: 'support@parameter1.com',
    sendFrom: 'LabPulse.com <noreply@parameter1.com>',
    logo: 'https://img.labpulse.com/files/base/smg/all/image/static/lab/lab-logo.svg?h=45&auto=format,compress&bg=000000&pad=5',
    bgColor: '#000000',
  },
};

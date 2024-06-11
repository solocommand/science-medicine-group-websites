const braze = require('./braze');
const contentMeter = require('./content-meter');
const gam = require('./gam');
const identityX = require('./identity-x');
const nativeX = require('./native-x');
const navigation = require('./navigation');
const newsletter = require('./newsletter');
const pageDetails = require('./page-details');
const search = require('./search');

const WPICLE_API_HOSTNAME = process.env.WPICLE_API_HOSTNAME || 'https://my.auntminnie.com';

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
  useLinkInjectedBody: process.env.USE_LINK_INJECTED_BODY === 'true',
  company: 'Science and Medicine Group',
  p1events: {
    tenant: 'smg',
    enabled: true,
    cookieDomain: process.env.NODE_ENV === 'production' ? 'auntminnie.com' : '',
  },
  logos: {
    navbar: {
      src: 'https://img.auntminnie.com/files/base/smg/all/image/static/am/AM_logo-purple-full_25_anniversary.png?h=60&auto=format,compress',
      srcset: [
        'https://img.auntminnie.com/files/base/smg/all/image/static/am/AM_logo-purple-full_25_anniversary.png?h=120&auto=format,compress 2x',
      ],
    },
    footer: {
      src: 'https://img.auntminnie.com/files/base/smg/all/image/static/am/AM_logo-white-full_25_anniversary.png?h=60&auto=format,compress',
      srcset: [
        'https://img.auntminnie.com/files/base/smg/all/image/static/am/AM_logo-white-full_25_anniversary.png?h=120&auto=format,compress 2x',
      ],
    },
    corporate: {
      alt: 'Science and Medicine Group Logo',
      href: 'https://scienceandmedicinegroup.com',
      src: 'https://img.auntminnie.com/files/base/smg/all/image/static/smg-logo.png?w=200&auto=format,compress',
      srcset: [
        'https://img.auntminnie.com/files/base/smg/all/image/static/smg-logo.png?w=200&auto=format,compress&dpr=2 2x',
      ],
    },
  },
  socialMediaLinks: [
    { provider: 'facebook', href: 'https://www.facebook.com/auntminnie.radiology', target: '_blank' },
    { provider: 'twitter', href: 'https://twitter.com/auntminnie', target: '_blank' },
    { provider: 'linkedin', href: 'https://www.linkedin.com/company/auntminnie.com/', target: '_blank' },
  ],
  podcastLinks: [],
  gtm: {
    containerId: 'GTM-WJZZSMD4',
  },
  gcse: {
    id: '01601ed862b144ef4',
  },
  wufoo: {
    userName: 'labpulse',
    'contact-us': {
      title: 'Drop us a line!',
      hash: 'p1sbrws11c3y833',
    },
  },
  inquiry: {
    enabled: false,
    directSend: false,
    sendTo: 'support@auntminnie.com',
    sendFrom: 'auntminnie.com <noreply@parameter1.com>',
    logo: 'https://img.auntminnie.com/files/base/smg/all/image/static/am/am-logo.svg?h=45&auto=format,compress&bg=000000&pad=5',
    bgColor: '#000000',
  },
  pageDetails,
  wpIcleHostname: WPICLE_API_HOSTNAME,
  defaultForumName: 'General Radiology',
};

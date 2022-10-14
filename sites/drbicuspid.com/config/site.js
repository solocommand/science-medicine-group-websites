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
    cookieDomain: process.env.NODE_ENV === 'production' ? 'drbicuspid.com' : '',
  },
  logos: {
    navbar: {
      src: 'https://img.drbicuspid.com/files/base/smg/all/image/static/drb/drb-logo.svg?h=45&auto=format,compress',
      srcset: [
        'https://img.drbicuspid.com/files/base/smg/all/image/static/drb/drb-logo.svg?h=90&auto=format,compress 2x',
      ],
    },
    footer: {
      src: 'https://img.drbicuspid.com/files/base/smg/all/image/static/drb/drb-logo.svg?h=60&auto=format,compress',
      srcset: [
        'https://img.drbicuspid.com/files/base/smg/all/image/static/drb/drb-logo.svg?h=120&auto=format,compress 2x',
      ],
    },
    corporate: {
      alt: 'Science and Medicine Group Logo',
      href: 'https://scienceandmedicinegroup.com',
      src: 'https://img.drbicuspid.com/files/base/smg/all/image/static/smg-logo.png?w=200&auto=format,compress',
      srcset: [
        'https://img.drbicuspid.com/files/base/smg/all/image/static/smg-logo.png?w=200&auto=format,compress&dpr=2 2x',
      ],
    },
  },
  socialMediaLinks: [
    { provider: 'facebook', href: 'https://www.facebook.com/DrBicuspid', target: '_blank' },
    { provider: 'twitter', href: 'https://twitter.com/drbicuspid', target: '_blank' },
    { provider: 'linkedin', href: 'https://www.linkedin.com/company/drbicuspid.com/', target: '_blank' },
  ],
  podcastLinks: [],
  gtm: {
    containerId: 'GTM-5RJ8D63',
  },
  inquiry: {
    enabled: false,
    directSend: false,
    sendTo: 'support@parameter1.com',
    sendFrom: 'drbicuspid.com <noreply@parameter1.com>',
    logo: 'https://img.drbicuspid.com/files/base/smg/all/image/static/drb/drb-logo.svg?h=45&auto=format,compress&bg=000000&pad=5',
    bgColor: '#000000',
  },
  setSearchSortFieldToScore: true,
};

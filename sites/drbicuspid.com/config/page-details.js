const idsSiblingRoutes = [
  { title: 2025, href: 'resources/conferences/ids/2025', alt: '2025 International Dental Show (IDS News Coverage' },
];

const cdsSiblingRoutes = [
  { title: 2025, href: 'resources/conferences/cds-midwinter/2025', alt: '2025 Chicago Dental Society-Midwinter (CDS News Coverage' },
];

module.exports = {
  'resources/conferences': {
    name: 'Conference',
    childrenAliases: [
      'resources/conferences/ids',
      'resources/conferences/cds-midwinter',
    ],
  },
  // International Dental Show (IDS) News Coverage'
  'resources/conferences/ids': {
    name: 'International Dental Show',
    teaser: 'Leading: IDS is the leading global trade fair for the dental community, which ensures sustainable success as a platform for innovation and market trends.',
    siteContext: {
      path: '/resources/conferences/ids',
    },
    primaryImage: {
      src: '/files/base/smg/all/image/static/drb/conference/ids-logo-farbig.png',
      alt: 'IDS News Coverage',
    },
    teaserCTA: 'View Latest Coverage',
  },
  'resources/conferences/ids/2025': {
    name: '2025 International Dental Show (IDS) News Coverage',
    siblingRoutes: idsSiblingRoutes,
  },

  // Chicago Dental Society (CDS) New Coverage
  'resources/conferences/cds-midwinter': {
    name: 'Chicago Dental Society-Midwinter',
    teaser: 'Keeping Chicago smiling for 160 years. The Chicago Dental Society formed in 1864 and was incorporated in 1878. We create and deliver high-quality, innovative programs that promote the art and science of dentistry and are responsive to the interests and needs of our members, the dental profession and the public we serve.',
    siteContext: {
      path: '/resources/conferences/cds-midwinter',
    },
    primaryImage: {
      src: '/files/base/smg/all/image/static/drb/conference/gtTPCjBP_400x400.jpg',
      alt: 'CDS News Coverage',
    },
    teaserCTA: 'View Latest Coverage',
  },
  'resources/conferences/cds-midwinter/2025': {
    name: '2025 Chicago Dental Society-Midwinter (CDS) News Coverage',
    siblingRoutes: cdsSiblingRoutes,
  },
};

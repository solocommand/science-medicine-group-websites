const privacyPolicy = require('./privacy-policy');
const subscribe = require('./subscribe');

const topics = [
  { href: '/bioprocessing', label: 'Bioprocessing' },
  { href: '/cancer-research', label: 'Cancer Research' },
  { href: '/cell-biology', label: 'Cell Biology' },
  { href: '/drug-discovery', label: 'Drug Discovery' },
  { href: '/gene-and-cell-therapy', label: 'Gene and Cell Therapy' },
  { href: '/immunonology', label: 'Immunology' },
  { href: '/omics', label: 'OMICs' },
];

const resources = [
  { href: '/insights', label: 'Insights' },
  { href: '/webinars', label: 'Webinars' },
  { href: '/video', label: 'Video' },
];

const utilities = [
  { href: '/page/advertise', label: 'Advertise' },
  { href: '/page/contact-us', label: 'Contact Us' },
];

const mobileMenu = {
  primary: [
    ...topics,
  ],
  secondary: [
    ...resources,
    subscribe,
    { href: '/', label: 'Advertise', target: '_blank' },
  ],
};

const desktopMenu = {
  about: [...utilities],
  sections: [
    ...topics,
  ],
};

module.exports = {
  type: 'navbar-c',
  promos: [
    {
      title: subscribe.label,
      callToAction: subscribe.label,
      link: subscribe.href,
    },
  ],
  user: {
    items: [
      {
        href: '/__user/login',
        label: 'Sign In',
        when: 'logged-out',
        modifiers: ['user'],
      },
      {
        href: '/__user/logout',
        label: 'Sign Out',
        when: 'logged-in',
        modifiers: ['user'],
      },
    ],
  },
  desktopMenu,
  mobileMenu,
  topics,
  primary: {
    items: topics,
  },
  secondary: {
    items: [],
  },
  tertiary: {
    items: [],
  },
  footer: {
    col1: {
      label: 'Topics',
      items: [
        ...topics,
      ],
    },
    col2: {
      label: 'Resources',
      items: [
        ...resources,
        { href: '#', label: 'TBD' },
        { href: '#', label: 'TBD' },
      ],
    },
    col3: {
      label: 'More',
      items: [
        { href: '#', label: 'TBD' },
        { href: '#', label: 'TBD' },
      ],
    },
    items: [
      privacyPolicy,
      { href: '/page/contact-us', label: 'Contact Us' },
      { href: '/site-map', label: 'Site Map' },
    ],
    topics: topics.primary,
    more: [
      ...utilities,
    ],
  },
};

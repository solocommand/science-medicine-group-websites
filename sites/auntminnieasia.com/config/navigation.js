const sortNavItems = require('@science-medicine-group/package-global/utils/sort-nav-items');

const subscribe = require('./subscribe');
const privacyPolicy = require('./privacy-policy');

const topics = [
  { href: '#', label: 'Topic 1' },
  { href: '#', label: 'Topic 2' },
  { href: '#', label: 'Topic 3' },
  { href: '#', label: 'Topic 4' },
  { href: '#', label: 'Topic 5' },
  { href: 'https://my.auntminnie.com/cases', label: 'Cases' },
  { href: 'https://my.auntminnie.com/jobs', label: 'Jobs' },
];

const secondary = [
  { href: '#', label: 'Videos' },
  // { href: '/resources/conferences', label: 'Conferences' },
];

const mobileMenu = {
  primary: sortNavItems([
    ...topics,
  ]),
  secondary: sortNavItems([
    ...secondary,
    subscribe,
  ]),
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
        href: '/user/login',
        label: 'Sign In',
        when: 'logged-out',
        modifiers: ['user'],
      },
      {
        href: '/logout',
        label: 'Sign Out',
        when: 'logged-in',
        modifiers: ['user'],
      },
    ],
    tools: [
      {
        href: '/user/login',
        label: 'Sign In',
        when: 'logged-out',
        modifiers: ['user'],
      },
      {
        href: '/user/profile',
        label: 'Modify profile',
        when: 'logged-in',
        modifiers: ['user'],
      },
      {
        href: '/logout',
        label: 'Sign Out',
        when: 'logged-in',
        modifiers: ['user'],
      },
    ],
  },
  mobileMenu,
  topics,
  primary: {
    items: secondary,
  },
  secondary: {
    items: topics,
  },
  tertiary: {
    items: [],
  },
  toggleMenu: {
    col1: {
      label: 'Topic 1',
      items: [
        { href: '#', label: 'Subtopic 1' },
        // ...sortNavItems(businessInsights),
        // { href: '/business-insites', label: 'View all &raquo;' },
      ],
    },
    col2: {
      label: 'Topic 2',
      items: [
        { href: '#', label: 'Subtopic 1' },
        // ...sortNavItems(diagnosticTechnologies).slice(0, 10),
        // { href: '/diagnostic-technologies', label: 'View all &raquo;' },
      ],
    },
    col3: {
      label: 'Topic 3',
      items: [
        { href: '#', label: 'Subtopic 1' },
        // ...sortNavItems(diseases).slice(0, 10),
        // { href: '/diseases', label: 'View all &raquo;' },
      ],
    },
    col4: {
      label: 'Topic 4',
      items: [
        { href: '#', label: 'Subtopic 1' },
        // ...resources,
        // ...pointOfCareTesting,
      ],
    },
  },
  footer: {
    col1: {
      label: 'Topics',
      items: topics,
    },
    col2: {
      label: 'Resources',
      items: [
        { href: '#', label: 'Resource 1' },
        // ...resources,
        // { href: '#', label: 'TBD' },
        // { href: '#', label: 'TBD' },
      ],
    },
    col3: {
      label: 'More',
      items: [
        { href: '#', label: 'More Item 1' },
        // { href: '#', label: 'TBD' },
        // { href: '#', label: 'TBD' },
      ],
    },
    items: [
      privacyPolicy,
      { href: '/page/copyright-information', label: 'Copyright Information' },
      { href: '/page/contact-us', label: 'Contact Us' },
      { href: '/site-map', label: 'Site Map' },
    ],
  },
};

const sortNavItems = require('@science-medicine-group/package-global/utils/sort-nav-items');
const icleCfg = require('./wp-icle');

const subscribe = require('./subscribe');
const privacyPolicy = require('./privacy-policy');

const topics = [
  { href: '/clinical-news', label: 'Clinical News' },
  { href: '/imaging-informatics', label: 'Imaging Informatics' },
  { href: '/industry-news', label: 'Industry News' },
  { href: '/practice-management', label: 'Practice Management' },
  { href: '/radiology-education', label: 'Radiology Education' },
  { href: '/subspecialties', label: 'Subspecialties' },
  ...(icleCfg.enabled ? [
    { href: `https://${icleCfg.hostname}/cases?VerifyLogin=1`, label: 'Cases', when: 'logged-in' },
    { href: `https://${icleCfg.hostname}/jobs?VerifyLogin=1`, label: 'Jobs', when: 'logged-in' },
    { href: `https://${icleCfg.hostname}/cases?VerifyLogin=0`, label: 'Cases', when: 'logged-out' },
    { href: `https://${icleCfg.hostname}/jobs?VerifyLogin=0`, label: 'Jobs', when: 'logged-out' },
  ] : []),
];

const secondary = [
  { href: '/about-us', label: 'About Us' },
  { href: '/forums', label: 'Forums' },
  { href: '/advertising', label: 'Advertising' },
  { href: '/help', label: 'Help' },
  { href: '/resources/conference', label: 'Conferences' },
  { href: '/resources/media-press', label: 'Media & Press' },
  { href: '/resources/videos', label: 'Videos' },
  { href: '/resources/webinars', label: 'Webinars' },
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
        href: '/login',
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
        href: '/login',
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

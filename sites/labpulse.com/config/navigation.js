const sortNavItems = require('@science-medicine-group/package-global/utils/sort-nav-items');

const subscribe = require('./subscribe');
const privacyPolicy = require('./privacy-policy');

const topics = [
  { href: '/business-insights', label: 'Business Insights' },
  { href: '/research-and-development', label: 'Research & Development' },
  { href: '/diagnostic-technologies', label: 'Diagnostic Technologies' },
  { href: '/diseases', label: 'Diseases' },
  { href: '/resources', label: 'Resources' },
  // { href: '/point-of-care-testing', label: 'Point-of-Care Testing' },
];

const businessInsights = [
  { href: '/business-insights/people-on-the-move', label: 'People on the Move' },
  { href: '/business-insights/trends-and-finance', label: 'Trends & Finance' },
  { href: '/business-insights/policy-and-regulation', label: 'Policy & Regulation' },
];

const researchDevelopment = [
  { href: '/research-and-development/clinical-trial', label: 'Clinical Trial' },
  { href: '/research-and-development/collaboration', label: 'Collaboration' },
  { href: '/research-and-development/funding', label: 'Funding' },
  { href: '/research-and-development/ruo', label: 'RUO' },
];

const diagnosticTechnologies = [
  { href: '/diagnostic-technologies/clinical-chemistry', label: 'Clinical Chemistry' },
  { href: '/diagnostic-technologies/immunoassays', label: 'Immunoassays' },
  { href: '/diagnostic-technologies/molecular-diagnostics', label: 'Molecular Diagnostics' },
  { href: '/diagnostic-technologies/emerging-technology', label: 'Emerging Technology' },
];

const diseases = [
  { href: '/diseases/autoimmune', label: 'Autoimmune' },
  { href: '/diseases/cancers', label: 'Cancers' },
  { href: '/diseases/cardiovascular', label: 'Cardiovascular' },
  { href: '/diseases/covid-19', label: 'Covid-19' },
  { href: '/diseases/health-topics', label: 'Health Topics' },
  { href: '/diseases/infectious', label: 'Infectious' },
];

const resources = [
  { href: '/page/about-us', label: 'About Us' },
  { href: '/resources/cases', label: 'Cases' },
  { href: '/resources/conferences', label: 'Conferences' },
  { href: '#', label: 'Showcasts' },
  { href: '/resources/vendors', label: 'Vendors' },
  { href: '/resources/video', label: 'Video' },
  { href: '/resources/webinars', label: 'Webinars' },
];

const mobileMenu = {
  primary: sortNavItems([
    ...topics,
  ]),
  secondary: sortNavItems([
    ...resources,
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
  },
  mobileMenu,
  topics,
  primary: {
    items: sortNavItems([
      ...resources,
    ]),
  },
  secondary: {
    items: [
      ...topics,
    ],
  },
  tertiary: {
    items: [],
  },
  contexts: [
    {
      when: ['/business-insights'],
      secondary: { items: [...topics] },
      tertiary: { items: [] },
      primary: {
        items: [
          ...businessInsights,
        ],
      },
    },
    {
      when: ['/diagnostic-technologies'],
      secondary: { items: [...topics] },
      tertiary: { items: [] },
      primary: {
        items: [
          ...diagnosticTechnologies,
        ],
      },
    },
    {
      when: ['/diseases'],
      secondary: { items: [...topics] },
      tertiary: { items: [] },
      primary: {
        items: [
          ...diseases,
        ],
      },
    },
    {
      when: ['/research-and-development'],
      secondary: { items: [...topics] },
      tertiary: { items: [] },
      primary: {
        items: [
          ...researchDevelopment,
        ],
      },
    },
    {
      when: ['/resources'],
      secondary: { items: [...topics] },
      tertiary: { items: [] },
      primary: {
        items: [
          ...resources,
        ],
      },
    },
  ],
  toggleMenu: {
    col1: {
      label: 'Business Insights',
      items: [
        ...sortNavItems(businessInsights),
        { href: '/business-insites', label: 'View all &raquo;' },
      ],
    },
    col2: {
      label: 'Diagnostic Tech',
      items: [
        ...sortNavItems(diagnosticTechnologies).slice(0, 10),
        { href: '/diagnostic-technologies', label: 'View all &raquo;' },
      ],
    },
    col3: {
      label: 'Diseases',
      items: [
        ...sortNavItems(diseases).slice(0, 10),
        { href: '/diseases', label: 'View all &raquo;' },
      ],
    },
    col4: {
      label: 'Resources',
      items: [
        ...resources,
      ],
    },
  },
  footer: {
    col1: {
      label: 'Topics',
      items: [
        { href: '/business-insights', label: 'Business Insights' },
        { href: '/diagnostic-technologies', label: 'Diagnostic Technologies' },
        { href: '/diseases', label: 'Diseases' },
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
      { href: '/page/copyright-information', label: 'Copyright Information' },
      { href: '/page/contact-us', label: 'Contact Us' },
      { href: '/site-map', label: 'Site Map' },
    ],
  },
};

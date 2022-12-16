const sortNavItems = require('@science-medicine-group/package-global/utils/sort-nav-items');

const subscribe = require('./subscribe');
const privacyPolicy = require('./privacy-policy');

const dentalPractice = [
  { href: '/dental-practice/dental-assistant', label: 'Dental Assistant' },
  { href: '/dental-practice/human-resources', label: 'Human Resources' },
  { href: '/dental-practice/insurance', label: 'Insurance' },
  { href: '/dental-practice/legal-issues', label: 'Legal Issues' },
  { href: '/dental-practice/marketing', label: 'Marketing' },
  { href: '/dental-practice/office-management', label: 'Office Management' },
  { href: '/dental-practice/patient-communication', label: 'Patient Communication' },
  { href: '/dental-practice/practice-sales', label: 'Practice Sales' },
];
const dentalSpecialties = [
  { href: '/dental-specialties/dental-lab', label: 'Dental Lab' },
  { href: '/dental-specialties/endontics', label: 'Endontics' },
  { href: '/dental-specialties/oral-maxillofacial-surgery', label: 'Oral & Maxillofacial Surgery' },
  { href: '/dental-specialties/orofacial-pain', label: 'Orofacial Pain' },
  { href: '/dental-specialties/pediatrics', label: 'Pediatrics' },
  { href: '/dental-specialties/periodontics', label: 'Periodontics' },
  { href: '/dental-specialties/restorations', label: 'Restorations' },
  { href: '/dental-specialties/smile-design', label: 'Smile Design' },
];
const oralSystemic = [
  { href: '/oral-systemic/antibiotics', label: 'Antibiotics' },
  { href: '/oral-systemic/oral-systemic-link', label: 'Oral-Systemic Link' },
  { href: '/oral-systemic/nutrition', label: 'Nutrition' },
  { href: '/oral-systemic/oral-cancer', label: 'Oral Cancer' },
  { href: '/oral-systemic/tmj-tmd', label: 'TMJ/TMD' },
  { href: '/oral-systemic/tobacco', label: 'Tobacco' },
];
const dentalHygiene = [
  { href: '/dental-hygiene/hygiene-tools', label: 'Hygiene Tools' },
  { href: '/dental-hygiene/infection-control', label: 'Infection Control' },
  { href: '/dental-hygiene/oral-bacteria', label: 'Oral Bacteria' },
  { href: '/dental-hygiene/prevention', label: 'Prevention' },
  { href: '/dental-hygiene/saliva-testing', label: 'Saliva Testing' },
  { href: '/dental-hygiene/scope-of-practice', label: 'Scope of Practice' },
];
const digitalDentistry = [
  { href: '/digital-dentistry/ai', label: 'AI' },
  { href: '/digital-dentistry/imaging-cad-cam', label: 'Imaging & CAD/CAM' },
  { href: '/digital-dentistry/implants', label: 'Implants' },
  { href: '/digital-dentistry/invisible-aligners', label: 'Invisible Aligners' },
  { href: '/digital-dentistry/lasers', label: 'Lasers' },
  { href: '/digital-dentistry/sleep-dentistry', label: 'Sleep Dentistry' },
  { href: '/digital-dentistry/treatment-software', label: 'Treatment Software' },
];
const dentalBusiness = [
  { href: '/dental-business/dental-education-school', label: 'Dental Education / School' },
  { href: '/dental-business/dental-organizations', label: 'Dental Organizations' },
  { href: '/dental-business/dso', label: 'DSO' },
  { href: '/dental-business/industry-updates', label: 'Industry Updates' },
  { href: '/dental-business/practice-trends', label: 'Practice Trends' },
  { href: '/dental-business/product-updates', label: 'Product Updates' },
  { href: '/dental-business/regulatory-updates', label: 'Regulatory Updates' },
];

const topics = [
  { href: '/dental-practice', label: 'Dental Practice', children: dentalPractice },
  { href: '/dental-specialties', label: 'Dental Specialties', children: dentalSpecialties },
  { href: '/oral-systemic', label: 'Oral-Systemic', children: oralSystemic },
  { href: '/dental-hygiene', label: 'Dental Hygiene', children: dentalHygiene },
  { href: '/digital-dentistry', label: 'Digital Dentistry', children: digitalDentistry },
  { href: '/dental-business', label: 'Dental Business', children: dentalBusiness },
];

const secondary = [
  { href: '/resources/videos', label: 'Videos' },
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
  contexts: [
    {
      when: ['/dental-practice'],
      secondary: {
        items: topics,
      },
      tertiary: { items: [] },
      primary: {
        items: dentalPractice,
      },
    },
    {
      when: ['/dental-specialties'],
      secondary: { items: topics },
      tertiary: { items: [] },
      primary: {
        items: dentalSpecialties,
      },
    },
    {
      when: ['/oral-systemic'],
      secondary: { items: [...topics] },
      tertiary: { items: [] },
      primary: {
        items: oralSystemic,
      },
    },
    {
      when: ['/dental-hygiene'],
      secondary: { items: topics },
      tertiary: { items: [] },
      primary: {
        items: dentalHygiene,
      },
    },
    {
      when: ['/digital-dentistry'],
      secondary: { items: topics },
      tertiary: { items: [] },
      primary: {
        items: digitalDentistry,
      },
    },
    {
      when: ['/dental-business'],
      secondary: { items: topics },
      tertiary: { items: [] },
      primary: {
        items: dentalBusiness,
      },
    },
  ],
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

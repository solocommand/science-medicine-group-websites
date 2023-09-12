const subscribe = require('./subscribe');
const privacyPolicy = require('./privacy-policy');

const dentalPractice = [
  { href: '/dental-practice/dental-assistant', label: 'Dental Assistant' },
  { href: '/dental-practice/legal-issues', label: 'Legal Issues' },
  { href: '/dental-practice/office-management', label: 'Office Management' },
  { href: '/dental-practice/patient-communication', label: 'Patient Communication' },
  { href: '/dental-practice/public-health', label: 'Public Health' },
  { href: 'https://my.drbicuspid.com/salary-scan', label: 'Salary Scan' },
  { href: '/dental-practice/wellness', label: 'Wellness' },
];
const dentalSpecialties = [
  { href: '/dental-specialties/endodontics', label: 'Endodontics' },
  { href: '/dental-specialties/oral-maxillofacial-surgery', label: 'Oral & Maxillofacial Surgery' },
  { href: '/dental-specialties/orofacial-pain', label: 'Orofacial Pain' },
  { href: '/dental-specialties/orthodontics', label: 'Orthodontics' },
  { href: '/dental-specialties/pediatrics', label: 'Pediatrics' },
  { href: '/dental-specialties/periodontics', label: 'Periodontics' },
  { href: '/dental-specialties/smile-design', label: 'Smile Design' },
];
const dentalHygiene = [
  { href: '/dental-hygiene/hygiene-tools', label: 'Hygiene Tools' },
  { href: '/dental-hygiene/infection-control', label: 'Infection Control' },
  { href: '/dental-hygiene/nutrition', label: 'Nutrition' },
  { href: '/dental-hygiene/oral-systemic-link', label: 'Oral-Systemic Link' },
  { href: '/dental-hygiene/scope-of-practice', label: 'Scope of Practice' },
];
const digitalDentistry = [
  { href: '/digital-dentistry/treatment-software', label: 'Treatment Software' },
  { href: '/digital-dentistry/imaging-cad-cam', label: 'Imaging & CAD/CAM' },
  { href: '/digital-dentistry/implants', label: 'Implants' },
  { href: '/digital-dentistry/sleep-dentistry', label: 'Sleep Dentistry' },
];
const dentalBusiness = [
  { href: '/dental-business/dental-education', label: 'Dental Education' },
  { href: '/dental-business/dso', label: 'DSO' },
  { href: '/dental-business/industry-updates', label: 'Industry Updates' },
  { href: '/dental-business/practice-sales', label: 'Practice Sales' },
  { href: '/dental-business/regulatory-updates', label: 'Regulatory Updates' },
];

const topics = [
  { href: '/dental-practice', label: 'Practice', children: dentalPractice },
  { href: '/dental-specialties', label: 'Specialties', children: dentalSpecialties },
  { href: '/dental-hygiene', label: 'Hygiene', children: dentalHygiene },
  { href: '/digital-dentistry', label: 'Digital Dentistry', children: digitalDentistry },
  { href: '/dental-business', label: 'Business', children: dentalBusiness },
  { href: 'https://my.drbicuspid.com/cases', label: 'Cases' },
  { href: 'https://my.drbicuspid.com/jobs', label: 'Jobs' },
];

const resources = [
  { href: '/page/about-us', label: 'About Us' },
  { href: '/resources/conferences', label: 'Conferences' },
  { href: '/resources/videos', label: 'Videos' },
  { href: '/resources/webinars', label: 'Webinars' },
  { href: '/resources/media-press', label: 'Media & Press' },
  { href: '/page/advertising', label: 'Advertising' },
  { href: '/page/help', label: 'Help' },
];

const mobileMenu = {
  primary: topics,
  secondary: resources,
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
    items: resources,
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
      label: 'Practice',
      items: dentalPractice,
    },
    col2: {
      label: 'Specialties',
      items: dentalSpecialties,
    },
    col3: {
      label: 'Digital Dentistry',
      items: digitalDentistry,
    },
    col4: {
      label: 'Hygiene',
      items: dentalHygiene,
    },
    col5: {
      label: 'Resources',
      items: resources,
    },
  },
  footer: {
    col1: {
      label: 'Topics',
      colspan: 5,
      items: [
        { href: '/dental-practice', label: 'Practice' },
        { href: '/dental-specialties', label: 'Specialties' },
        { href: '/dental-hygiene', label: 'Hygiene' },
        { href: '/digital-dentistry', label: 'Digital Dentistry' },
        { href: '/dental-business', label: 'Business' },
      ],
    },
    col2: {
      label: 'Resources',
      items: resources,
    },
    items: [
      privacyPolicy,
      { href: '/page/terms-conditions', label: 'Terms & Conditions' },
      { href: '/page/contact-us', label: 'Contact Us' },
      { href: '/site-map', label: 'Site Map' },
      { href: '/', label: 'Home' },
    ],
  },
};

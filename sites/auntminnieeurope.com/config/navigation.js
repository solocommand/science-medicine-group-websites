const subscribe = require('./subscribe');
const privacyPolicy = require('./privacy-policy');

const WPICLE_API_HOSTNAME = process.env.WPICLE_API_HOSTNAME || 'https://my.auntminnie.com';
const AM_URL = process.env.AM_URL || 'https://www.auntminnie.com';

const clinicalNews = [
  { href: '/clinical-news/ct', label: 'CT' },
  { href: '/clinical-news/digital-x-ray', label: 'Digital X-Ray' },
  { href: '/clinical-news/interventional', label: 'Interventional' },
  { href: '/clinical-news/molecular-imaging', label: 'Molecular Imaging' },
  { href: '/clinical-news/mri', label: 'MRI' },
  { href: '/clinical-news/radiation-oncology-therapy', label: 'Radiation Oncology/Therapy' },
  { href: '/clinical-news/ultrasound', label: 'Ultrasound' },
  { href: '/clinical-news/womens-imaging', label: 'Womens Imaging' },
];
const imagingInformatics = [
  { href: '/imaging-informatics/advanced-visualization', label: 'Advanced Visualization' },
  { href: '/imaging-informatics/enterprise-imaging', label: 'Enterprise Imaging' },
  { href: '/imaging-informatics/artificial-intelligence', label: 'Artificial Intelligence' },
  { href: '/imaging-informatics/cybersecurity', label: 'Cybersecurity' },
];
const industryNews = [
  { href: '/industry-news/product-news', label: 'Product News' },
  { href: '/industry-news/regulatory', label: 'Regulatory' },
  { href: '/industry-news/ma', label: 'M&A' },
  { href: '/industry-news/market-analysis', label: 'Market Analysis' },
  { href: '/industry-news/installations', label: 'Installations' },
];
const practiceManagement = [
  // { href: '/medical-legal-and-practice/health-equity', label: 'Health Equity' },
  { href: '/medical-legal-and-practice/socioeconomic', label: 'Socioeconomic' },
  // { href: '/medical-legal-and-practice/medicolegal-issues', label: 'Medicolegal Issues' },
  { href: '/medical-legal-and-practice/organized-radiology-issues', label: 'Organized Radiology Issues' },
  // { href: '/medical-legal-and-practice/patient-safety', label: 'Patient Safety' },
  { href: '/medical-legal-and-practice/service', label: 'Service' },
  // { href: '/medical-legal-and-practice/tributes-obits', label: 'Tributes & Obits' },
];
const radiologyEducation = [
  { href: '/radiology-education/medical-students', label: 'Medical Students' },
  { href: '/radiology-education/residents-fellows', label: 'Residents/Fellows' },
];
const subspecialties = [
  { href: '/subspecialties/breast-imaging', label: 'Breast Imaging' },
  { href: '/subspecialties/cardiovascular-radiology', label: 'CV' },
  { href: '/subspecialties/chest-radiology', label: 'Chest' },
  { href: '/subspecialties/emergency-radiology', label: 'Emergency' },
  { href: '/subspecialties/gastrointestinal-radiology', label: 'GI' },
  { href: '/subspecialties/genitourinary-radiology', label: 'GU' },
  { href: '/subspecialties/head-and-neck-radiology', label: 'Head & Neck' },
  { href: '/subspecialties/interventional-radiology', label: 'Interventional' },
  { href: '/subspecialties/medical-physics', label: 'Physics' },
  { href: '/subspecialties/musculoskeletal-radiology', label: 'MSK' },
  { href: '/subspecialties/neuroradiology', label: 'Neuro' },
  { href: '/subspecialties/nuclear-radiology', label: 'Nuclear' },
  { href: '/subspecialties/pediatric-radiology', label: 'Pediatric' },
  { href: '/subspecialties/radiation-oncology', label: 'Radiation Oncology' },
];

const topics = [
  { href: '/clinical-news', label: 'Clinical News', children: clinicalNews },
  { href: '/imaging-informatics', label: 'Informatics', children: imagingInformatics },
  { href: '/industry-news', label: 'Industry News', children: industryNews },
  { href: '/medical-legal-and-practice', label: 'Medical, Legal, And Practice', children: practiceManagement },
  { href: '/radiology-education', label: 'Education', children: radiologyEducation },
  { href: '/subspecialties', label: 'Subspecialties', children: subspecialties },
  // eslint-disable-next-line no-script-url
  { href: 'javascript:document.querySelector(".site-navbar__toggler").click()', label: 'More' },
];

const resources = [
  { href: WPICLE_API_HOSTNAME, label: 'myAuntMinnieEurope' },
  { href: 'https://auntminnieeurope.careerwebsite.com/', label: 'Careers' },
  { href: `${WPICLE_API_HOSTNAME}/cases`, label: 'Cases' },
  { href: '/resources/conference', label: 'Conferences' },
  { href: `${WPICLE_API_HOSTNAME}/forums`, label: 'Forums' },
  { href: '/resources/videos', label: 'Videos' },
  { href: '/resources/webinars', label: 'Webinars' },
  { href: '/resources/vendors', label: 'Vendors' },
  { href: AM_URL, label: 'AuntMinnie' },
];

const more = [
  { href: '/page/about-us', label: 'About Us' },
  { href: '/page/advertising', label: 'Advertising' },
  { href: '/page/help', label: 'Help' },
  { href: '/page/EAB', label: 'AMEU Editorial Advisory Board' },
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
        href: '/user/logout',
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
        href: '/user/logout',
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
      when: ['/clinical-news'],
      secondary: { items: topics },
      tertiary: { items: [] },
      primary: { items: clinicalNews },
    },
    {
      when: ['/imaging-informatics'],
      secondary: { items: topics },
      tertiary: { items: [] },
      primary: { items: imagingInformatics },
    },
    {
      when: ['/industry-news'],
      secondary: { items: topics },
      tertiary: { items: [] },
      primary: { items: industryNews },
    },
    {
      when: ['/medical-legal-and-practice'],
      secondary: { items: topics },
      tertiary: { items: [] },
      primary: { items: practiceManagement },
    },
    {
      when: ['/radiology-education'],
      secondary: { items: topics },
      tertiary: { items: [] },
      primary: { items: radiologyEducation },
    },
    {
      when: ['/subspecialties'],
      secondary: { items: topics },
      tertiary: { items: [] },
      primary: { items: subspecialties },
    },
  ],
  toggleMenu: {
    col1: {
      label: 'Clinical News',
      items: clinicalNews,
    },
    col2: {
      label: 'Imaging Informatics',
      items: imagingInformatics,
    },
    col3: {
      label: 'Industry News',
      items: industryNews,
    },
    col4: {
      label: 'Medical, Legal, and Practice',
      items: practiceManagement,
    },
    col5: {
      label: 'Resources',
      items: resources,
    },
    col6: {
      label: 'More',
      items: more,
    },
  },
  footer: {
    col1: {
      label: 'Topics',
      colspan: 3,
      items: [
        { href: '/clinical-news', label: 'Clinical News' },
        { href: '/imaging-informatics', label: 'Informatics' },
        { href: '/industry-news', label: 'Industry News' },
        { href: '/medical-legal-and-practice', label: 'Medical, Legal, And Practice' },
        { href: '/radiology-education', label: 'Education' },
        { href: '/subspecialties', label: 'Subspecialties' },
      ],
    },
    col2: {
      label: 'Resources',
      colspan: 3,
      items: resources,
    },
    col3: {
      label: 'More',
      colspan: 2,
      items: more,
    },
    items: [
      privacyPolicy,
      {
        label: 'Privacy Settings',
        attrs: {
          onclick: '(function() { window.illow.showWidget();})()',
        },
        classNames: 'bannerLink',
        // eslint-disable-next-line no-script-url
        href: 'javascript:void(0)',
      },
      { href: '/page/terms-conditions', label: 'Terms & Conditions' },
      { href: '/page/contact-us', label: 'Contact Us' },
      { href: '/site-map', label: 'Site Map' },
      { href: '/', label: 'Home' },
    ],
  },
};

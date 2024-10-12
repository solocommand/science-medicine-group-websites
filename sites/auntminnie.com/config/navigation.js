const subscribe = require('./subscribe');
const privacyPolicy = require('./privacy-policy');

const WPICLE_API_HOSTNAME = process.env.WPICLE_API_HOSTNAME || 'https://my.auntminnie.com';

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
  { href: '/industry-news/installations', label: 'Installations' },
  { href: '/industry-news/product-news', label: 'Product News' },
  { href: '/industry-news/regulatory', label: 'Regulatory' },
  { href: '/industry-news/ma', label: 'M&A' },
  { href: '/industry-news/market-analysis', label: 'Market Analysis' },
];
const practiceManagement = [
  { href: '/practice-management/administration', label: 'Administration' },
  { href: '/practice-management/associations', label: 'Associations' },
  { href: '/practice-management/careers', label: 'Careers' },
  { href: '/practice-management/equity-inclusion', label: 'Equity & Inclusion' },
  { href: '/practice-management/medicolegal', label: 'Medicolegal' },
  { href: '/practice-management/patient-safety', label: 'Patient Safety' },
  { href: '/practice-management/radiologic-technologist', label: 'Radiologic Technologist' },
  { href: '/practice-management/service', label: 'Service' },
  { href: 'https://selfserve.decipherinc.com/survey/selfserve/2260/240613#?', label: 'Salary Scan', target: '_blank' },
];
const radiologyEducation = [
  { href: '/radiology-education/medical-students', label: 'Medical Students' },
  { href: '/radiology-education/residents-fellows', label: 'Residents/Fellows' },
  { href: '/page/scott-williams', label: 'Scott Williams' },
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
  { href: 'https://www.auntminnieeurope.com', label: 'Europe' },
  { href: '/clinical-news', label: 'Clinical News', children: clinicalNews },
  { href: '/imaging-informatics', label: 'Informatics', children: imagingInformatics },
  { href: '/industry-news', label: 'Industry News', children: industryNews },
  { href: '/practice-management', label: 'Practice Management', children: practiceManagement },
  { href: '/radiology-education', label: 'Education', children: radiologyEducation },
  { href: '/subspecialties', label: 'Subspecialties', children: subspecialties },
  // eslint-disable-next-line no-script-url
  { href: 'javascript:document.querySelector(".site-navbar__toggler").click()', label: 'More' },
];

const resources = [
  { href: WPICLE_API_HOSTNAME, label: 'myAuntMinnie' },
  { href: 'https://www.auntminniecme.com/', label: 'CME' },
  { href: 'https://auntminnie.careerwebsite.com/home/index.cfm', label: 'Careers' },
  { href: `${WPICLE_API_HOSTNAME}/cases`, label: 'Cases' },
  { href: `${WPICLE_API_HOSTNAME}/forums`, label: 'Forums' },
  { href: '/resources/conference', label: 'Conferences' },
  { href: '/resources/videos', label: 'Videos' },
  { href: '/resources/webinars', label: 'Webinars' },
  { href: '/podcasts', label: 'Podcasts' },
  { href: '/page/advertising', label: 'Advertising' },
  { href: 'https://issuu.com/auntminnie/docs/2024_auntminnie_buyer_s_guide_01112024', label: 'Buyer\'s Guide', target: '_blank' },
  { href: '/resources/vendors', label: 'Vendors' },
  { href: '/25-for-25', label: '25 for 25' },
];

const more = [
  { href: '/page/about-us', label: 'About Us' },
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
      when: ['/practice-management'],
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
      label: 'Practice Management',
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
        { href: '/imaging-informatics', label: 'Imaging Informatics' },
        { href: '/industry-news', label: 'Industry News' },
        { href: '/practice-management', label: 'Practice Management' },
        { href: '/radiology-education', label: 'Radiology Education' },
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

const sortNavItems = require('@science-medicine-group/package-global/utils/sort-nav-items');

const subscribe = require('./subscribe');
const privacyPolicy = require('./privacy-policy');

const topics = [
  { href: '/business-insights', label: 'Business Insights' },
  { href: '/diagnostic-technologies', label: 'Diagnostic Technologies' },
  { href: '/diseases', label: 'Diseases' },
  { href: '/point-of-care-testing', label: 'Point-of-Care Testing' },
  { href: '/resources', label: 'Resources' },
];

const secondary = [
  { href: '/resources/cases', label: 'Cases' },
  { href: '/resources/webinars', label: 'Webinars' },
  { href: '/resources/video', label: 'Video' },
  { href: '/resources/conferences', label: 'Conferences' },
  { href: '#', label: 'Vendor Connect' },
];

const businessInsights = [
  { href: '/business-insights/business-financial-trends', label: 'Business and Financial Trends' },
  { href: '/business-insights/regulatory-news', label: 'Regulatory News' },
  { href: '/business-insights/reimbursement-legislation', label: 'Reimbursement and Legislation' },
  { href: '/business-insights/research', label: 'Research' },
];

const diagnosticTechnologies = [
  { href: '/diagnostic-technologies/artificial-intelligence', label: 'Artificial Intelligence' },
  { href: '/diagnostic-technologies/automation-liquid-handling', label: 'Automation/Liquid Handling' },
  { href: '/diagnostic-technologies/biomarker-discovery-validation', label: 'Biomarker Discovery & Validation' },
  { href: '/diagnostic-technologies/clinical-chemistry', label: 'Clinical Chemistry' },
  { href: '/diagnostic-technologies/business-financial-trends', label: 'Business and Financial Trends' },
  { href: '/diagnostic-technologies/clinical-proteomics', label: 'Clinical Proteomics' },
  { href: '/diagnostic-technologies/clinical-sequencing', label: 'Clinical Sequencing' },
  { href: '/diagnostic-technologies/drug-discovery-development', label: 'Drug Discovery and Development' },
  { href: '/diagnostic-technologies/emerging-technologies', label: 'Emerging Technologies' },
  { href: '/diagnostic-technologies/hematology', label: 'Hematology' },
  { href: '/diagnostic-technologies/immunoassays', label: 'Immunoassays' },
  { href: '/diagnostic-technologies/lab-software', label: 'Lab Software' },
  { href: '/diagnostic-technologies/liquid-biopsy', label: 'Liquid Biopsy' },
  { href: '/diagnostic-technologies/mass-spec', label: 'Mass Spec' },
  { href: '/diagnostic-technologies/medical-imaging', label: 'Medical Imaging' },
  { href: '/diagnostic-technologies/molecular-diagnostics', label: 'Molecular Diagnostics' },
  { href: '/diagnostic-technologies/pathology-histology', label: 'Pathology and Histology' },
  { href: '/diagnostic-technologies/proteomics', label: 'Proteomics' },
  { href: '/diagnostic-technologies/urinalysis', label: 'Urinalysis' },
  { href: '/diagnostic-technologies/veterinary-diagnostics', label: 'Veterinary Diagnostics' },
];

const diseases = [
  { href: '/diseases/autoimmune-diseases', label: 'Autoimmune Diseases' },
  { href: '/diseases/cancers', label: 'Cancers' },
  { href: '/diseases/cardiovascular-diseases', label: 'Cardiovascular Diseases' },
  { href: '/diseases/diabetes', label: 'Diabetes' },
  { href: '/diseases/drugs-abuse-toxicology', label: 'Drugs Abuse/Toxicology' },
  { href: '/diseases/hematology', label: 'Hematology' },
  { href: '/diseases/infectious-diseases', label: 'Infectious Diseases' },
  { href: '/diseases/inherited-diseases', label: 'Inherited Diseases' },
  { href: '/diseases/neurological-psychological-disorders', label: 'Neurological & Psychological Disorders' },
  { href: '/diseases/reproductive-health', label: 'Reproductive Health' },
  { href: '/diseases/respiratory-diseases', label: 'Respiratory Diseases' },
];

const pointOfCareTesting = [
  { href: '/point-of-care-testing/home', label: 'Home' },
  { href: '/point-of-care-testing/hospital', label: 'Hospital' },
  { href: '/point-of-care-testing/urgent-care-doctors-office', label: 'Urgent Care / Doctor\'s Office' },
];

const resources = [
  { href: '/resources/people-in-the-news', label: 'People in the News' },
  { href: '/resources/cases', label: 'Cases' },
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
  },
  mobileMenu,
  topics,
  primary: {
    items: sortNavItems([
      ...topics,
    ]),
  },
  secondary: {
    items: [
      ...secondary,
    ],
  },
  tertiary: {
    items: [],
  },
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
        ...pointOfCareTesting,
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

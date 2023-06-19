const rsnaSiblingRoutes = [
  { title: 2022, href: 'resources/conference/rsna/2022', alt: '2022 Radiological Society of North America (RSNA) News Coverage' },
  { title: 2021, href: 'resources/conference/rsna/2021', alt: '2021 Radiological Society of North America (RSNA) News Coverage' },
  { title: 2020, href: 'resources/conference/rsna/2020', alt: '2020 Radiological Society of North America (RSNA) News Coverage' },
  { title: 2019, href: 'resources/conference/rsna/2019', alt: '2019 Radiological Society of North America (RSNA) News Coverage' },
];

const ecrSiblingRoutes = [
  { title: 2023, href: 'resources/conference/ecr/2023', alt: '2023 European Congress of Radiology (ECR) News Coverage' },
  { title: 2019, href: 'resources/conference/ecr/2019', alt: '2019 European Congress of Radiology (ECR) News Coverage' },
  { title: 2018, href: 'resources/conference/ecr/2018', alt: '2018 European Congress of Radiology (ECR) News Coverage' },
];

const ismrmSiblingRoutes = [
  { title: 2022, href: 'resources/conference/ismrm/2022', alt: '2022 Radiological Society of North America (ISMRM) News Coverage' },
  { title: 2021, href: 'resources/conference/ismrm/2021', alt: '2021 Radiological Society of North America (ISMRM) News Coverage' },
  { title: 2020, href: 'resources/conference/ismrm/2020', alt: '2020 Radiological Society of North America (ISMRM) News Coverage' },
  { title: 2019, href: 'resources/conference/ismrm/2019', alt: '2019 Radiological Society of North America (ISMRM) News Coverage' },
];

const ahraSiblingRoutes = [
  { title: 2022, href: 'resources/conference/ahra/2022', alt: '2022 Radiological Society of North America (AHRA) News Coverage' },
  { title: 2021, href: 'resources/conference/ahra/2021', alt: '2021 Radiological Society of North America (AHRA) News Coverage' },
];

module.exports = {
  'resources/conference': {
    name: 'Conference',
    childrenAliases: [
      'resources/conference/rsna',
      'resources/conference/ecr',
      'resources/conference/ismrm',
      'resources/conference/ahra',
    ],
  },
  // Radiological Society of North America (RSNA) News Coverage'
  'resources/conference/rsna': {
    name: 'Radiological Society of North America (RSNA) News Coverage',
    teaser: 'Radiological Society of North America (RSNA) News Coverage --- Teaser TBD',
    siteContext: {
      path: '/resources/conference/rsna',
    },
    primaryImage: {
      src: 'https://www.auntminnie.com/user/images/content_images/rca_rsna_2001/2014_11_21_10_31_22_205_RADCast_rsna.jpg',
      alt: 'RSNA News Coverage',
    },
    teaserCTA: 'View Latest Coverage',
  },
  'resources/conference/rsna/2022': {
    name: '2022 Radiological Society of North America (RSNA) News Coverage',
    siblinRoutes: rsnaSiblingRoutes,
  },
  'resources/conference/rsna/2021': {
    name: '2021 Radiological Society of North America (RSNA) News Coverage',
    siblinRoutes: rsnaSiblingRoutes,
  },
  'resources/conference/rsna/2020': {
    name: '2020 Radiological Society of North America (RSNA) News Coverage',
    siblinRoutes: rsnaSiblingRoutes,
  },
  'resources/conference/rsna/2019': {
    name: '2019 Radiological Society of North America (RSNA) News Coverage',
    siblinRoutes: rsnaSiblingRoutes,
  },
  // European Congress of Radiology (ECR) News Coverage
  'resources/conference/ecr': {
    name: 'European Congress of Radiology (ECR) News Coverage',
    teaser: 'European Congress of Radiology (ECR) News Coverage --- Teaser TBD',
    siteContext: {
      path: '/resources/conference/ecr',
    },
    primaryImage: {
      src: 'https://www.auntminnie.com/user/images/content_images/rca_rsna_2001/2016_03_02_06_32_39_747_RADCast_ecr_conf_icon.jpg',
      alt: 'ECR News Coverage',
    },
    teaserCTA: 'View Latest Coverage',
  },
  'resources/conference/ecr/2023': {
    name: '2023 European Congress of Radiology (ECR) News Coverage',
    siblinRoutes: ecrSiblingRoutes,
  },
  'resources/conference/ecr/2019': {
    name: '2019 European Congress of Radiology (ECR) News Coverage',
    siblinRoutes: ecrSiblingRoutes,
  },
  'resources/conference/ecr/2018': {
    name: '2018 European Congress of Radiology (ECR) News Coverage',
    siblinRoutes: ecrSiblingRoutes,
  },
  // International Society for Magnetic Resonance in Medicine (ISMRM) News Coverage
  'resources/conference/ismrm': {
    name: 'International Society for Magnetic Resonance in Medicine (ISMRM) News Coverage',
    teaser: 'International Society for Magnetic Resonance in Medicine (ISMRM) News Coverage --- Teaser TBD',
    siteContext: {
      path: '/resources/conference/ismrm',
    },
    primaryImage: {
      src: 'https://www.auntminnie.com/user/images/content_images/radcastredirect/2019_05_14_22_07_0136_ISMRM-wide-logo.png',
      alt: 'ISMRM News Coverage',
    },
    teaserCTA: 'View Latest Coverage',
  },
  'resources/conference/ismrm/2022': {
    name: '2022 Radiological Society of North America (ISMRM) News Coverage',
    siblinRoutes: ismrmSiblingRoutes,
  },
  'resources/conference/ismrm/2021': {
    name: '2021 Radiological Society of North America (ISMRM) News Coverage',
    siblinRoutes: ismrmSiblingRoutes,
  },
  'resources/conference/ismrm/2020': {
    name: '2020 Radiological Society of North America (ISMRM) News Coverage',
    siblinRoutes: ismrmSiblingRoutes,
  },
  'resources/conference/ismrm/2019': {
    name: '2019 Radiological Society of North America (ISMRM) News Coverage',
    siblinRoutes: ismrmSiblingRoutes,
  },
  // American Healthcare Radiology Administrators (AHRA) News Coverage
  'resources/conference/ahra': {
    name: 'American Healthcare Radiology Administrators (AHRA) News Coverage',
    teaser: 'American Healthcare Radiology Administrators (AHRA) News Coverage --- Teaser TBD',
    siteContext: {
      path: '/resources/conference/ahra',
    },
    primaryImage: {
      src: 'https://www.auntminnie.com/user/images/content_images/radcastredirect/2021_07_29_21_10_5024_RADCast_AHRA_AMConferences_Graphic_BlackWhite.gif',
      alt: 'AHRA News Coverage',
    },
    teaserCTA: 'View Latest Coverage',
  },
  'resources/conference/ahra/2022': {
    name: '2022 Radiological Society of North America (AHRA) News Coverage',
    siblinRoutes: ahraSiblingRoutes,
  },
  'resources/conference/ahra/2021': {
    name: '2021 Radiological Society of North America (AHRA) News Coverage',
    siblinRoutes: ahraSiblingRoutes,
  },
};

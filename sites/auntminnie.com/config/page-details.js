const rsnaSiblingRoutes = [
  { title: 2023, href: 'resources/conference/rsna/2023', alt: '2023 Radiological Society of North America (RSNA News Coverage' },
  { title: 2022, href: 'resources/conference/rsna/2022', alt: '2022 Radiological Society of North America (RSNA) News Coverage' },
  { title: 2021, href: 'resources/conference/rsna/2021', alt: '2021 Radiological Society of North America (RSNA) News Coverage' },
  { title: 2020, href: 'resources/conference/rsna/2020', alt: '2020 Radiological Society of North America (RSNA) News Coverage' },
  { title: 2019, href: 'resources/conference/rsna/2019', alt: '2019 Radiological Society of North America (RSNA) News Coverage' },
];

const ecrSiblingRoutes = [
  { title: 2024, href: 'resources/conference/ecr/2024', alt: '2024 European Congress of Radiology (ECR) News Coverage' },
  { title: 2023, href: 'resources/conference/ecr/2023', alt: '2023 European Congress of Radiology (ECR) News Coverage' },
  { title: 2019, href: 'resources/conference/ecr/2019', alt: '2019 European Congress of Radiology (ECR) News Coverage' },
  { title: 2018, href: 'resources/conference/ecr/2018', alt: '2018 European Congress of Radiology (ECR) News Coverage' },
];

const ismrmSiblingRoutes = [
  { title: 2024, href: 'resources/conference/ismrm/2024', alt: '2024 Radiological Society of North America (ISMRM) News Coverage' },
  { title: 2023, href: 'resources/conference/ismrm/2023', alt: '2023 Radiological Society of North America (ISMRM) News Coverage' },
  { title: 2022, href: 'resources/conference/ismrm/2022', alt: '2022 Radiological Society of North America (ISMRM) News Coverage' },
  { title: 2021, href: 'resources/conference/ismrm/2021', alt: '2021 Radiological Society of North America (ISMRM) News Coverage' },
  { title: 2020, href: 'resources/conference/ismrm/2020', alt: '2020 Radiological Society of North America (ISMRM) News Coverage' },
  { title: 2019, href: 'resources/conference/ismrm/2019', alt: '2019 Radiological Society of North America (ISMRM) News Coverage' },
];

const ahraSiblingRoutes = [
  { title: 2022, href: 'resources/conference/ahra/2022', alt: '2022 Radiological Society of North America (AHRA) News Coverage' },
  { title: 2021, href: 'resources/conference/ahra/2021', alt: '2021 Radiological Society of North America (AHRA) News Coverage' },
];

const snmmiSiblingRoutes = [
  { title: 2024, href: 'resources/conference/snmmi/2024', alt: '2024 Society of Nuclear Medicine & Molecular Imaging (SNMMI) News Coverage' },
];

module.exports = {
  'resources/conference': {
    name: 'Conference',
    childrenAliases: [
      'resources/conference/rsna',
      'resources/conference/ecr',
      'resources/conference/ismrm',
      'resources/conference/ahra',
      'resources/conference/snmmi',
    ],
  },
  // Radiological Society of North America (RSNA) News Coverage'
  'resources/conference/rsna': {
    name: 'Radiological Society of North America',
    teaser: 'The Radiological Society of North America (RSNA) supports your career in radiology. Explore membership benefits and find a variety of high-quality education resources.',
    siteContext: {
      path: '/resources/conference/rsna',
    },
    primaryImage: {
      src: 'https://www.auntminnie.com/user/images/content_images/rca_rsna_2001/2014_11_21_10_31_22_205_RADCast_rsna.jpg',
      alt: 'RSNA News Coverage',
    },
    teaserCTA: 'View Latest Coverage',
  },
  'resources/conference/rsna/2023': {
    name: '2023 Radiological Society of North America (RSNA) News Coverage',
    siblingRoutes: rsnaSiblingRoutes,
  },
  'resources/conference/rsna/2022': {
    name: '2022 Radiological Society of North America (RSNA) News Coverage',
    siblingRoutes: rsnaSiblingRoutes,
  },
  'resources/conference/rsna/2021': {
    name: '2021 Radiological Society of North America (RSNA) News Coverage',
    siblingRoutes: rsnaSiblingRoutes,
  },
  'resources/conference/rsna/2020': {
    name: '2020 Radiological Society of North America (RSNA) News Coverage',
    siblingRoutes: rsnaSiblingRoutes,
  },
  'resources/conference/rsna/2019': {
    name: '2019 Radiological Society of North America (RSNA) News Coverage',
    siblingRoutes: rsnaSiblingRoutes,
  },
  // European Congress of Radiology (ECR) News Coverage
  'resources/conference/ecr': {
    name: 'European Congress of Radiology',
    teaser: 'The leading medical society for radiology in Europe, we are dedicated to advancing the field through education, research, and innovation. Our annual European Congress of Radiology is the largest and most influential radiology meeting.',
    siteContext: {
      path: '/resources/conference/ecr',
    },
    primaryImage: {
      src: 'https://img.auntminnie.com/files/base/smg/all/image/static/am/conference/esr-logo.png',
      alt: 'ECR News Coverage',
    },
    teaserCTA: 'View Latest Coverage',
  },
  'resources/conference/ecr/2024': {
    name: '2024 European Congress of Radiology (ECR) News Coverage',
    siblingRoutes: ecrSiblingRoutes,
  },
  'resources/conference/ecr/2023': {
    name: '2023 European Congress of Radiology (ECR) News Coverage',
    siblingRoutes: ecrSiblingRoutes,
  },
  'resources/conference/ecr/2019': {
    name: '2019 European Congress of Radiology (ECR) News Coverage',
    siblingRoutes: ecrSiblingRoutes,
  },
  'resources/conference/ecr/2018': {
    name: '2018 European Congress of Radiology (ECR) News Coverage',
    siblingRoutes: ecrSiblingRoutes,
  },
  // International Society for Magnetic Resonance in Medicine (ISMRM) News Coverage
  'resources/conference/ismrm': {
    name: 'International Society for Magnetic Resonance in Medicine',
    teaser: 'The International Society of Magnetic Resonance (ISMAR) is the unique worldwide scientiﬁc organization that represents the entire range of the important research ﬁeld of magnetic resonance (MR), in particular nuclear magnetic resonance (NMR), electron paramagnetic resonance (EPR), and magnetic resonance imaging (MRI). These and further MR methods are used as main research tools in a very wide range of ﬁelds including Physics, Chemistry, Life Sciences, Materials Research and Medicine.',
    siteContext: {
      path: '/resources/conference/ismrm',
    },
    primaryImage: {
      src: 'https://img.auntminnie.com/files/base/smg/all/image/static/am/conference/ISMRM.png',
      alt: 'ISMRM News Coverage',
    },
    teaserCTA: 'View Latest Coverage',
  },
  'resources/conference/ismrm/2024': {
    name: '2024 International Society of Magnetic Resonance (ISMRM) News Coverage',
    siblingRoutes: ismrmSiblingRoutes,
  },
  'resources/conference/ismrm/2023': {
    name: '2023 International Society of Magnetic Resonance (ISMRM) News Coverage',
    siblingRoutes: ismrmSiblingRoutes,
  },
  'resources/conference/ismrm/2022': {
    name: '2022  International Society of Magnetic Resonance (ISMRM) News Coverage',
    siblingRoutes: ismrmSiblingRoutes,
  },
  'resources/conference/ismrm/2021': {
    name: '2021  International Society of Magnetic Resonance (ISMRM) News Coverage',
    siblingRoutes: ismrmSiblingRoutes,
  },
  'resources/conference/ismrm/2020': {
    name: '2020  International Society of Magnetic Resonance (ISMRM) News Coverage',
    siblingRoutes: ismrmSiblingRoutes,
  },
  'resources/conference/ismrm/2019': {
    name: '2019  International Society of Magnetic Resonance (ISMRM) News Coverage',
    siblingRoutes: ismrmSiblingRoutes,
  },
  // American Healthcare Radiology Administrators (AHRA) News Coverage
  'resources/conference/ahra': {
    name: 'American Healthcare Radiology Administrators',
    teaser: 'AHRA: The Association for Medical Imaging Management is the professional organization representing management at all levels of hospital imaging departments, freestanding imaging centers, and group practices.',
    siteContext: {
      path: '/resources/conference/ahra',
    },
    primaryImage: {
      src: 'https://img.auntminnie.com/files/base/smg/all/image/static/am/conference/ahra.jpeg',
      alt: 'AHRA News Coverage',
    },
    teaserCTA: 'View Latest Coverage',
  },
  'resources/conference/ahra/2022': {
    name: '2022 American Healthcare Radiology Administrators (AHRA) News Coverage',
    siblingRoutes: ahraSiblingRoutes,
  },
  'resources/conference/ahra/2021': {
    name: '2021 American Healthcare Radiology Administrators (AHRA) News Coverage',
    siblingRoutes: ahraSiblingRoutes,
  },
  // Society of Nuclear Medicine & Molecular Imaging (SNMMI) New Coverage
  'resources/conference/snmmi': {
    name: 'Society of Nuclear Medicine & Molecular Imaging',
    teaser: 'The premier educational, scientific, research, and networking event in nuclear medicine and molecular imaging, the SNMMI Annual Meeting provides physicians, technologists, pharmacists, laboratory professionals, and scientists with an in-depth view of the latest research and development in the field as well as providing insights into practical applications for the clinic.',
    siteContext: {
      path: '/resources/conference/snmmi',
    },
    primaryImage: {
      src: 'https://img.auntminnie.com/files/base/smg/all/image/static/am/conference/snmmi.png',
      alt: 'SNMMI News Coverage',
    },
    teaserCTA: 'View Latest Coverage',
  },
  'resources/conference/snmmi/2024': {
    name: '2024 Society of Nuclear Medicine & Molecular Imaging',
    siblingRoutes: snmmiSiblingRoutes,
  },
};

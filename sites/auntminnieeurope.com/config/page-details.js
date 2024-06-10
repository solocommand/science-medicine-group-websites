const ecrSiblingRoutes = [
  { title: 2024, href: 'resources/conferences/ecr/2024', alt: '2024 European Congress of Radiology (ECR) News Coverage' },
];

const ismrmSiblingRoutes = [
  { title: 2024, href: 'resources/conferences/ismrm/2024', alt: '2024 Radiological Society of North America (ISMRM) News Coverage' },
];

const snmmiSiblingRoutes = [
  { title: 2024, href: 'resources/conferences/snmmi/2024', alt: '2024 Society of Nuclear Medicine & Molecular Imaging (SNMMI) News Coverage' },
];

module.exports = {
  'resources/conferences': {
    name: 'Conference',
    childrenAliases: [
      'resources/conferences/ecr',
      'resources/conferences/ismrm',
      'resources/conferences/snmmi',
    ],
  },
  // European Congress of Radiology (ECR) News Coverage
  'resources/conferences/ecr': {
    name: 'European Congress of Radiology',
    teaser: 'The leading medical society for radiology in Europe, we are dedicated to advancing the field through education, research, and innovation. Our annual European Congress of Radiology is the largest and most influential radiology meeting.',
    siteContext: {
      path: '/resources/conferences/ecr',
    },
    primaryImage: {
      src: 'https://img.auntminnieeurope.com/files/base/smg/all/image/static/ame/conference/esr-logo.png',
      alt: 'ECR News Coverage',
    },
    teaserCTA: 'View Latest Coverage',
  },
  'resources/conferences/ecr/2024': {
    name: '2024 European Congress of Radiology (ECR) News Coverage',
    siblingRoutes: ecrSiblingRoutes,
  },
  // International Society for Magnetic Resonance in Medicine (ISMRM) News Coverage
  'resources/conferences/ismrm': {
    name: 'International Society for Magnetic Resonance in Medicine',
    teaser: 'The International Society of Magnetic Resonance (ISMAR) is the unique worldwide scientiﬁc organization that represents the entire range of the important research ﬁeld of magnetic resonance (MR), in particular nuclear magnetic resonance (NMR), electron paramagnetic resonance (EPR), and magnetic resonance imaging (MRI). These and further MR methods are used as main research tools in a very wide range of ﬁelds including Physics, Chemistry, Life Sciences, Materials Research and Medicine.',
    siteContext: {
      path: '/resources/conferences/ismrm',
    },
    primaryImage: {
      src: 'https://img.auntminnieeurope.com/files/base/smg/all/image/static/ame/conference/ISMRM.png',
      alt: 'ISMRM News Coverage',
    },
    teaserCTA: 'View Latest Coverage',
  },
  'resources/conferences/ismrm/2024': {
    name: '2024 International Society of Magnetic Resonance (ISMRM) News Coverage',
    siblingRoutes: ismrmSiblingRoutes,
  },
  // Society of Nuclear Medicine & Molecular Imaging (SNMMI) New Coverage
  'resources/conferences/snmmi': {
    name: 'Society of Nuclear Medicine & Molecular Imaging',
    teaser: 'The premier educational, scientific, research, and networking event in nuclear medicine and molecular imaging, the SNMMI Annual Meeting provides physicians, technologists, pharmacists, laboratory professionals, and scientists with an in-depth view of the latest research and development in the field as well as providing insights into practical applications for the clinic.',
    siteContext: {
      path: '/resources/conferences/snmmi',
    },
    primaryImage: {
      src: 'https://img.auntminnieeurope.com/files/base/smg/all/image/static/ame/conference/snmmi.png',
      alt: 'SNMMI News Coverage',
    },
    teaserCTA: 'View Latest Coverage',
  },
  'resources/conferences/snmmi/2024': {
    name: '2024 Society of Nuclear Medicine & Molecular Imaging',
    siblingRoutes: snmmiSiblingRoutes,
  },
};

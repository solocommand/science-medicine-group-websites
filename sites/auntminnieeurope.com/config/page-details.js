const ecrSiblingRoutes = [
  { title: 2024, href: 'resources/conferences/ecr/2024', alt: '2024 European Congress of Radiology (ECR) News Coverage' },
  { title: 2023, href: 'resources/conferences/ecr/2023', alt: '2023 European Congress of Radiology (ECR) News Coverage' },
  { title: 2019, href: 'resources/conferences/ecr/2019', alt: '2019 European Congress of Radiology (ECR) News Coverage' },
  { title: 2018, href: 'resources/conferences/ecr/2018', alt: '2018 European Congress of Radiology (ECR) News Coverage' },
];

module.exports = {
  'resources/conferences': {
    name: 'Conference',
    childrenAliases: [
      'resources/conferences/ecr',
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
  'resources/conferences/ecr/2023': {
    name: '2023 European Congress of Radiology (ECR) News Coverage',
    siblingRoutes: ecrSiblingRoutes,
  },
  'resources/conferences/ecr/2019': {
    name: '2019 European Congress of Radiology (ECR) News Coverage',
    siblingRoutes: ecrSiblingRoutes,
  },
  'resources/conferences/ecr/2018': {
    name: '2018 European Congress of Radiology (ECR) News Coverage',
    siblingRoutes: ecrSiblingRoutes,
  },
};

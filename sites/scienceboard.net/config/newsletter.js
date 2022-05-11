const privacyPolicy = require('./privacy-policy');

const baseConfig = {
  action: 'https://sciencemedicinegroup.dragonforms.com/loading.do',
  hiddenInputs: [
    { name: 'omedasite', value: 'sab_subscriptions' },
  ],
};

const defaults = {
  name: 'Don’t Miss Out',
  description: 'Get the business tips, industry insights and trending news every professional needs to know.',
  defaultNewsletter: {
    deploymentTypeId: 29,
    name: 'Daily Report',
    eventCategory: 'Daily Newsletter Subscription',
  },
  privacyPolicy,
  newsletters: [
    {
      deploymentTypeId: 30,
      name: 'Equipment Weekly',
      description: 'Roundup of news and reviews',
      eventCategory: 'Weekly Equipment Subscription',
    },
    {
      deploymentTypeId: 31,
      name: 'Technology Weekly',
      description: 'Top tech developments in the industry',
      eventCategory: 'Weekly Technology Subscription',
    },
    {
      deploymentTypeId: 32,
      name: 'Weekend Newsletter',
      description: 'The top news of the week in the industry',
      eventCategory: 'Weekend Newsletter',
    },
  ],
  demographic: {
    id: 72,
    label: 'Your primary role?',
    values: [
      { id: 123, label: 'Other' },
    ],
  },
};

module.exports = {
  // uses inline omeda form
  signupBanner: {
    ...defaults,
    imagePath: 'files/base/smg/all/image/static/newsletter-pushdown/sab-full.png',
  },
  pushdown: {
    ...defaults,
    imagePath: 'files/base/smg/all/image/static/newsletter-pushdown/sab-half.png',
    description: 'Description',
  },

  // links off to seperate omeda dragonform
  signupBannerLarge: {
    ...baseConfig,
    name: 'Don’t Miss Out',
    description: 'Description',
  },
  signupFooter: {
    ...baseConfig,
    name: 'Newsletter for Professionals',
    description: 'Description',
  },
};

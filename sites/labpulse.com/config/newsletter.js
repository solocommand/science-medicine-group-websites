const defaults = {
  name: 'Don’t Miss Out',
  description: 'Breaking, business, and industry news about the clinical lab community.',
  action: '/user/subscribe',
  privacyPolicy: {
    label: 'Privacy Policy',
    href: '/page/privacy-policy',
    target: '_blank',
  },
  hiddenInputs: [],
};

module.exports = {
  pushdown: {
    ...defaults,
    imagePath: 'files/base/smg/all/image/static/lab/newsletter-phone-half.png',
  },
  signupBannerLarge: {
    ...defaults,
  },
  signupFooter: {
    ...defaults,
    colspan: 5,
    enable: true,
    name: 'Stay Connected',
  },
};

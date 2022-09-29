const defaults = {
  name: 'Don’t Miss Out',
  description: 'Breaking, business, and industry news about the clinical lab community.',
  action: '/user/subscribe',
  hiddenInputs: [],
};

module.exports = {
  pushdown: {
    ...defaults,
    // imagePath: 'files/base/randallreilly/all/image/static/newsletter-pushdown/ovd-half.png',
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

const defaults = {
  name: 'Don’t Miss Out',
  description: 'Breaking, business, and industry news about the clinical lab community.',
};

module.exports = {
  pushdown: {
    ...defaults,
    imagePath: 'files/base/smg/all/image/static/lab/newsletter-phone-half.png',
  },
  signupBanner: {
    ...defaults,
  },
  signupFooter: {
    ...defaults,
    colspan: 5,
    enable: true,
    name: 'Stay Connected',
  },
};

const defaults = {
  name: 'Stay in the Know',
  description: 'Your Daily Scoop on Dental News',
};

module.exports = {
  pushdown: {
    ...defaults,
    imagePath: 'files/base/smg/all/image/static/drb/drb-newsletter-phone-half.png',
  },
  signupBanner: {
    ...defaults,
  },
  modal: {
    enabled: process.env.SIGNUP_MODAL_ENABLED === 'true',
    ...defaults,
  },
  signupFooter: {
    ...defaults,
    colspan: 5,
    enable: true,
    name: 'Stay Connected',
  },
};

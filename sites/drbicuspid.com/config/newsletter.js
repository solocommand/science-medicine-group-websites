const defaults = {
  name: 'Stay in the Know',
  description: 'Delivered right to your inbox, Dr. Bicuspid’s newsletters. Subscribe to get exclusive access!',
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
    name: 'Sign Up. Stay Informed.',
    description: 'Your Daily Scoop on Dental News',
  },
  signupFooter: {
    ...defaults,
    colspan: 5,
    enable: true,
    name: 'Stay Connected',
  },
};

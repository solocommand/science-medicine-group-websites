const defaults = {
  name: 'Stay in the Know',
  description: 'Delivered right to your inbox, LabPulse’s newsletters keep you informed on the latest clinical lab updates. Subscribe to get exclusive access!',
};

module.exports = {
  pushdown: {
    ...defaults,
    imagePath: 'files/base/smg/all/image/static/lab/newsletter-phone-half.png',
  },
  signupBanner: {
    ...defaults,
    imagePath: 'files/base/smg/all/image/static/lab/newsletter-phone-full.png',
  },
  modal: {
    enabled: process.env.SIGNUP_MODAL_ENABLED === 'true',
    ...defaults,
    imagePath: 'files/base/smg/all/image/static/lab/newsletter-phone-full.png',
    description: 'Get exclusive insights, trends, and innovations in clinical lab excellence!',
  },
  signupFooter: {
    ...defaults,
    colspan: 5,
    enable: true,
    name: 'Stay Connected',
  },
};

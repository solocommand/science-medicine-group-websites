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
  signupFooter: {
    ...defaults,
    colspan: 5,
    enable: true,
    name: 'Stay Connected',
  },
};

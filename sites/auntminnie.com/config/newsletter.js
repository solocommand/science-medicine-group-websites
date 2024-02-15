const defaults = {
  name: 'Stay in the Know',
  description: 'Delivered right to your inbox, Aunt Minnie\'s newsletters. Subscribe to get exclusive access!',
};

module.exports = {
  signupBanner: {
    ...defaults,
    imagePath: 'files/base/smg/all/image/static/am/newsletter-phone-full.png',
  },
  pushdown: {
    ...defaults,
    imagePath: 'files/base/smg/all/image/static/am/newsletter-phone-half.png',
  },
  modal: {
    ...defaults,
  },
  signupFooter: {
    ...defaults,
    name: 'Stay Connected',
    colspan: 3,
    enable: true,
  },
};

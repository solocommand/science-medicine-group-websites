const defaults = {
  name: 'Stay in the Know',
  description: 'Delivered right to your inbox, Aunt Minnie\'s newsletters. Subscribe to get exclusive access!',
};

module.exports = {
  signupBanner: {
    ...defaults,
    imagePath: 'files/base/p1/sandbox/image/static/newsletter-phone-full.png',
  },
  pushdown: {
    ...defaults,
    imagePath: 'files/base/p1/sandbox/image/static/newsletter-phone-half.png',
  },
  signupFooter: {
    ...defaults,
    name: 'Stay Connected',
  },
};

const defaults = {
  name: 'Stay in the Know',
  description: 'Delivered right to your inbox, Aunt Minnies’s newsletters. Subscribe to get exclusive access!',
};

module.exports = {
  pushdown: {
    ...defaults,
    imagePath: 'files/base/smg/all/image/static/',
  },
  signupBanner: {
    ...defaults,
  },
  signupFooter: {
    ...defaults,
    colspan: 3,
    enable: true,
    name: 'Stay Connected',
  },
};

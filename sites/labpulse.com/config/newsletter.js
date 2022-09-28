const baseConfig = {
  action: '/user/subscribe',
  hiddenInputs: [],
};

module.exports = {
  signupBannerLarge: {
    ...baseConfig,
    name: 'Don’t Miss Out',
    description: 'Breaking, business, and industry news about the clinical lab community.',
  },
  signupFooter: {
    ...baseConfig,
    colspan: 5,
    enable: true,
    name: 'Stay Connected',
    description: 'Breaking, business, and industry news about the clinical lab community.',
  },
};

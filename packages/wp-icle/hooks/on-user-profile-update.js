const debug = require('debug')('wp-icle');
const { get } = require('@parameter1/base-cms-object-path');

module.exports = async (args) => {
  const enabled = get(args, 'service.res.locals.icle.enabled');
  debug('onUserProfileUpdate', 'icleconfig', enabled);
};

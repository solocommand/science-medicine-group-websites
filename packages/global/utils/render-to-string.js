const buildMarkoGlobal = require('@parameter1/base-cms-marko-core/utils/build-marko-global');

module.exports = (Component, {
  out,
  input,
  clean = true,
} = {}) => {
  const { res } = out.global;
  const $global = buildMarkoGlobal(res);
  const str = Component.renderToString({ ...input, $global });
  if (!clean) return str;
  return str.replace(/\s\s+/g, ' ').replace(/[\n\r]/g, '').trim();
};

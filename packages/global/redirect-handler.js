const patterns = [
  {
    pattern: /^\/(dentistry|clinical-laboratory|science-and-medicine|radiology)-conferences$/i,
    to: '/resources/conferences',
  },
  { pattern: /\/index.aspx\?sec=def/i, to: '/' },
  { pattern: /\/index.aspx\?sec=sup/i, to: '/' },
  { pattern: /\/index.aspx\?sec=lin&sub=sea&pag=cnf/i, to: '/resources/conferences' },
  { pattern: /\/index.aspx\?sec=log&sub=opt/i, to: '/user/profile', code: 302 },
  { pattern: /\/index.aspx\?sec=nws&sub=rad/i, to: '/' },
  { pattern: /\/index.aspx\?sec=nws&sub=thd/i, to: '/' },
  { pattern: /\/forum/i, to: '/' },
  { pattern: /\/index.aspx\?sec=abt&sub=frm&cfname=ratecard/i, to: '/page/media-kit' },
  { pattern: /\/index.aspx\?Sec=abt&sub=cnt/i, to: '/page/contact-us' },
  { pattern: /\/index.aspx\?Sec=abt/i, to: '/page/about-us' },
];

module.exports = siteHandler => ({ from, req, app }) => {
  if (typeof siteHandler === 'function') {
    const match = siteHandler({ from, req, app });
    if (match) return match;
  }
  const { originalUrl } = req;
  // match redirect patterns
  for (let i = 0; i < patterns.length; i += 1) {
    const { pattern, to, code } = patterns[i];
    const match = pattern.test(originalUrl);
    if (match) return { to, code: code || 301 };
  }
  // Redirect all old vendor URLs
  if (req.query.sec && req.query.sec === 'vendor') return { to: '/resources/vendors' };
  return null;
};

const patterns = [
  {
    pattern: /^\/(dentistry|clinical-laboratory|science-and-medicine|radiology)-conferences$/i,
    to: '/resources/conferences',
  },
  {
    pattern: /^\/slas2022/i,
    to: '/showcasts/slas/2022',
  },
  { pattern: /\/index.aspx\?sec=def/i, to: '/' },
  { pattern: /\/index.aspx\?sec=sup/i, to: '/' },
  { pattern: /\/index.aspx\?sec=sup&sub=labs/i, to: '/diagnostic-technologies/emerging-technology/lab-software' },
  { pattern: /\/Microbiology/i, to: '/diagnostic-technologies/molecular-diagnostics/microbiology' },
  { pattern: /\/Molecular-Diagnostics/i, to: '/diagnostic-technologies/molecular-diagnostics' },
  { pattern: /\/Next-Generation-Sequencing/i, to: '/diagnostic-technologies/molecular-diagnostics/sequencing' },
  { pattern: /\/Point-of-Care/i, to: '/point-of-care-testing' },
  { pattern: /\/index.aspx\?sec=lin&sub=sea&pag=cnf/i, to: '/resources/conferences' },
  { pattern: /\/index.aspx\?sec=log&sub=opt/i, to: '/user/profile', code: 302 },
  { pattern: /\/index.aspx\?sec=nws&sub=rad/i, to: '/' },
  { pattern: /\/index.aspx\?sec=nws&sub=thd/i, to: '/' },
  { pattern: /\/forum/i, to: '/' },
  { pattern: /\/index.aspx\?sec=rca&sub=aacc_2022/i, to: '/showcasts/aacc/2022' },
  { pattern: /\/index.aspx\?sec=rca&sub=aacr_2022/i, to: '/showcasts/aacr/2022' },
  { pattern: /\/index.aspx\?sec=rca&sub=slas_2022/i, to: '/showcasts/slas/2022' },
  { pattern: /\/index.aspx\?sec=abt&sub=faq&pag=dis&ItemId=800010/i, to: '/page/privacy-policy' },
  { pattern: /\/index.aspx\?sec=abt&sub=frm&cfname=ratecard/i, to: '/page/media-kit' },
  { pattern: /\/index.aspx\?Sec=abt&sub=cnt/i, to: '/page/contact-us' },
  { pattern: /\/index.aspx\?Sec=abt/i, to: '/page/about-us' },
];

module.exports = ({ req }) => {
  const from = req.originalUrl;
  // match redirect patterns
  for (let i = 0; i < patterns.length; i += 1) {
    const { pattern, to, code } = patterns[i];
    const match = pattern.test(from);
    if (match) return { to, code: code || 301 };
  }
  // Redirect all old vendor URLs
  if (req.query.sec && req.query.sec === 'vendor') return { to: '/resources/vendors' };
  return null;
};

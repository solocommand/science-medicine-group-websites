const patterns = [
  { pattern: /^\/slas2022/i, to: '/showcasts/slas/2022' },
  { pattern: /\/index.aspx\?sec=sup&sub=labs/i, to: '/diagnostic-technologies/emerging-technology/lab-software' },
  { pattern: /\/Microbiology/i, to: '/diagnostic-technologies/molecular-diagnostics/microbiology' },
  { pattern: /\/Molecular-Diagnostics/i, to: '/diagnostic-technologies/molecular-diagnostics' },
  { pattern: /\/Next-Generation-Sequencing/i, to: '/diagnostic-technologies/molecular-diagnostics/sequencing' },
  { pattern: /\/Point-of-Care/i, to: '/point-of-care-testing' },
  { pattern: /\/index.aspx\?sec=rca&sub=aacc_2022/i, to: '/showcasts/aacc/2022' },
  { pattern: /\/index.aspx\?sec=rca&sub=aacr_2022/i, to: '/showcasts/aacr/2022' },
  { pattern: /\/index.aspx\?sec=rca&sub=slas_2022/i, to: '/showcasts/slas/2022' },
  { pattern: /\/index.aspx\?sec=abt&sub=faq&pag=dis&ItemId=800010/i, to: '/page/privacy-policy' },
  { pattern: /\/index.aspx\?Sec=abt&sub=cnt/i, to: '/page/contact-us' },
  { pattern: /\/index.aspx\?sec=abt&sub=sitemap/i, to: '/site-map' },
  { pattern: /\/index.aspx\?sec=vendor/i, to: '/resources/vendors' },
  { pattern: /\/IVD\//i, to: '/diagnostic-technologies' },

];

module.exports = ({ req }) => {
  const { originalUrl } = req;
  for (let i = 0; i < patterns.length; i += 1) {
    const { pattern, to, code } = patterns[i];
    const match = pattern.test(originalUrl);
    if (match) return { to, code: code || 301 };
  }
  return null;
};

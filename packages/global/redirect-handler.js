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

  // Redirect unsubscribe links to preference center
  // https://www.labpulse.com/index.aspx?sec=opt&sub=ins&ems=1&email=jennifer.avolio+test@bioinfoinc.com&wf=374
  if (req.query.sec === 'opt' && req.query.sub === 'ins') {
    const { email } = req.query;
    if (email) {
      return {
        // Legacy URLs did not properly encode the plus character
        to: `/user/subscribe?email=${encodeURIComponent(email.replace(' ', '+'))}`,
      };
    }
    return { to: '/user/subscribe' };
  }

  // Redirect reset password page
  // https://www.labpulse.com/index.aspx?sec=log&sub=pas&muid=11296478&wf=374
  if (req.query.sec === 'log' && req.query.sec === 'pas') return { to: '/page/account', code: 302 };

  // Redirect old support form to contact
  // https://www.labpulse.com/index.aspx?sec=abt&sub=frm&cfname=support
  if (req.query.sec === 'abt' && req.query.sub === 'frm' && req.query.cfname === 'support') {
    return { to: '/page/contact-us', code: 302 };
  }

  if (req.query.sec === 'abt') return { to: '/page/about-us' };

  return null;
};

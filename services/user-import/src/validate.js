const { isEmailBurner } = require('burner-email-providers');
const validator = require('validator');

const { log } = console;

// These addresses fail ZeroBounce validation
const bad = [
  'raghu27266@gmail.com',
  'saknmumar7479@gmail.com',
  'gyajvmsyskd@gmail.com',
  'adk837388819@gmail.com',
  'megh@gmail.com',
  'a8182636372765@gmail.com',
  'vxb@gmail.ctbnbhgbbbhbhbnh',
  'hfbcbvjndb884@gmail.com',
  'bxhdhhdsh@gmail.clm',
  'denzlerandria@gmail.com',
  'gabshjzjh@gmail.con',
  'gulnoraxonmirzayeva@gmail.com',
  '0228bryan@vpn.com',
  'zhasikwm0@hotmail.com',
  'rodriguezesteban1999@hotmail.com',
  'mdksjsk73837@gmail.com',
  'tiktiki23@gmail.com',
  'ssundi66@gmail.co',
  'juan.ramon@fiba.com',
  'johnsmith235@gmail.com',
  'pablodrzxbxjdolo@gmail.com',
  'daija.wiegand@mohr.com',
  'mohameedshareefdoctor@gmail.com',
  'hdsdhiufvnk467@gmail.com',
  'a@hso.ajj',
  'xynkffgtfgjnays@gmail.com',
  'towfikame95@yahooand.com',
  'uyok_bugok@gmail.com',
  'eiks@gmail.com',
  'shduisjg@gmail.com',
  'shreysingh4095@gmail.com',
  'aghinknnkgjm97@gmail.com',
  'odai8593@gmail.con',
  'shuv6@gmail.com',
  'tdwjseshe76@gmail.com',
  'keshavhhkumar30721@gmail.com',
  'ralu6844@gmail.com',
  'rjaib@gmail.com',
  'arunav.kakat887755@gmail.com',
  'y9ditsits@gmail.com',
  'meriamgarcia@gmail.com',
  'drjduss@gmail.com',
  'khsfh.com',
  '2mishra54@gmail.com',
  'ulaindogat35@gmail.com',
  'oyal@gmail.com',
  'dfhrar1842@gmail.com',
  'febjoougnnk40@gmail.com',
  'ajubhall77@gmail.com',
  'juanlui1o@gmail.com',
  'ryujv@gmail.com',
  'pevatikash777@gmail.com',
  'pargexbm0@gmail.com',
  'suman126805645@gmail.com',
  'espin@vpn.con',
  'amit.kumar@test1.com',
  'pradhta2@gmail.com',
  'lemouyarx@gmail.com',
  'laurogonncziii99@gmail.com',
  'florencia@gmeil.com',
  'horacio.cogo80@gmail.com',
  'gastonuriarte@dbo.com',
  '8serenajvnb6r@hotmail.com',
  'arami32@outlook.com',
  'araaami32@outlook.com',
  'matias1juancho1112@gmail.com',
  'juliosamuel.88@gmail.com',
  'juliarolblolo@hotmail.com',
  'eliroh_052@hotmail.com',
  'sijriklfu@gmail.com',
  'piefyruchdtr@hotmail.com',
  'il44u@hotmail.com',
];

/**
 * Determines if the supplied email is valid or not
 *
 * @param {string} email
 * @returns {boolean}
 */
module.exports = (email) => {
  try {
    if (!email) return false;
    const normalized = `${email}`.trim().toLowerCase();
    if (bad.includes(normalized)) return false;
    const isBurner = isEmailBurner(normalized);
    const isValid = validator.isEmail(normalized);
    const [, domain] = normalized.split('@');
    if (/\.com[a-z0-9]+/.test(domain)) return false;
    if (isBurner) return false;
    return isValid;
  } catch (e) {
    log('Unable to parse email address', email, e);
    return false;
  }
};

module.exports = (app) => {
  app.get('/:alias(contact-us|about-us|contact-our-staff)', (req, res) => {
    res.redirect(301, '/page/contact-us');
  });
  app.get('/:alias(feed)', (req, res) => {
    res.redirect(301, '/__rss/website-scheduled-content.xml?input=%7B"sectionAlias"%3A"home"%7D');
  });
};

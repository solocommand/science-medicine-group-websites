const path = require('path');

const handler = (req, res, next) => {
  const { name: fileName } = req.params;
  const options = {
    root: path.resolve(__dirname, '../public'),
    dotfiles: 'deny',
  };
  res.sendFile(fileName, options, (err) => {
    if (err) next(err);
  });
};

module.exports = (app) => {
  const files = ['ads.txt'];

  files.forEach((name) => {
    app.get(`/:name(${name})`, handler);
  });
};

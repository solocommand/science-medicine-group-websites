const inquirer = require('inquirer');
const { readdir } = require('node:fs/promises');
const execute = require('./execute');

const { error, log } = console;

(async () => {
  const { file, site } = await inquirer.prompt([
    {
      name: 'file',
      type: 'list',
      choices: async () => {
        const files = await readdir('./data');
        return files.filter((name) => /\.csv$/.test(name));
      },
    },
    {
      name: 'site',
      type: 'list',
      choices: ['AM', 'DRB'],
    },
  ]);

  const list = site === 'AM' ? '6bbda052-75b3-4c48-bbbe-a943a1b7beac' : '2712ea70-a46a-4b40-91bb-e00c38647657';

  await execute({ file, list, site });
})().then(() => log('Done!')).catch((err) => {
  error(err);
  process.exit(1);
});

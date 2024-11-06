const inquirer = require('inquirer');
const { readdir } = require('node:fs/promises');

const execute = require('./execute');
const { isDev } = require('./env');

const { error, log } = console;

const getList = (site) => {
  if (isDev) {
    return site === 'AM' ? {
      name: 'DEV TEST: AM LFTE',
      subscriptionGroupId: '18471607-1b55-4fd0-9bf7-2a50ecf2c5e0', // DEV LP LFTE
      segmentId: 'P1TestSegment_export',
    } : {
      name: 'DEV TEST: DRB LFTE',
      subscriptionGroupId: '0b04dd58-ba3b-4c31-abb9-c48e8164616c', // DEV LP Breaking News
      segmentId: 'P1TestSegment_export',
    };
  }
  return site === 'AM' ? {
    name: 'AM_Daily_ ALL (AM)',
    subscriptionGroupId: '6bbda052-75b3-4c48-bbbe-a943a1b7beac',
    segmentId: '025d1235-4f0d-454a-babf-5469a731f5b8',
  } : {
    name: 'LFTE_All (DRB)',
    subscriptionGroupId: '2712ea70-a46a-4b40-91bb-e00c38647657',
    segmentId: '525fdcc0-be08-44f8-b088-13bb953453ba',
  };
};

(async () => {
  log('Starting user import...');
  const { file, site } = await inquirer.prompt([
    {
      name: 'file',
      type: 'list',
      message: 'select data file',
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

  const list = getList(site);

  await execute({ file, list, site });
})().then(() => log('Done!')).catch((err) => {
  error(err);
  process.exit(1);
});

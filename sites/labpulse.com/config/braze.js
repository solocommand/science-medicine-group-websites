const isDev = process.env.NODE_ENV !== 'development';

module.exports = {
  apiHost: 'https://rest.iad-05.braze.com',
  apiKey: process.env.BRAZE_API_KEY,

  subscriptionGroups: [
    // @todo read from IdentityX fields! hardcoding for now.
    {
      id: '632b6e95ae524333855b92eb', // IdentityX boolean question id
      label: 'Letter from the Editor',
      description: 'Send me roundups of all the latest clinical and industry news.',
      groupId: isDev ? '18471607-1b55-4fd0-9bf7-2a50ecf2c5e0' : '7cfdb3d3-0fbf-4ed8-a058-9beae72276a3',
    },
    {
      id: '632b6f54ae5243fd6c5b92ec',
      label: 'Breaking News',
      description: 'Send me breaking news about research, business, and other developments.',
      groupId: isDev ? '0b04dd58-ba3b-4c31-abb9-c48e8164616c' : '423213b2-8d3a-44e8-9bc0-2036fb140cb8',
    },
    {
      id: '632b6f7c6fe1916e1695d29c',
      label: 'Market Research Panel',
      description: 'Notify me about ongoing market research activities at LabPulse.com. This confidential service fully complies with our privacy policy.',
      groupId: isDev ? 'bde85512-e88a-46a4-9e3c-4458de8041a6' : '7ae331cb-7736-4bd6-9af9-400c5a1bcee5',
    },
    {
      id: '632b6f96ae524321925b92ed',
      label: 'Spotlight',
      description: 'The LabPulse Spotlight can help you make the most of your LabPulse membership. Get notifications about new content, services, or educational resources designed to help you sharpen your skills and grow professionally. Join the Spotlight today!',
      groupId: isDev ? '79da1458-6183-4bcc-8502-ec6b828c39e5' : '63077630-7fc8-4fa7-bcd8-f1ebaab0a7a9',
    },
  ],
};

module.exports = {
  apiHost: 'https://rest.iad-05.braze.com',
  apiKey: process.env.BRAZE_API_KEY,
  tenant: 'smg',
  fieldMap: {
    id: 'external_id',
    givenName: 'first_name',
    familyName: 'last_name',
    email: 'email',
    city: 'home_city',
    countryCode: 'country',
    phoneNumber: 'phone',
    organization: 'org_name',
  },
  subscriptionGroups: [
    // @todo read from IdentityX fields! hardcoding for now.
    {
      id: '632b6e95ae524333855b92eb', // IdentityX boolean question id
      label: 'Letter from the Editor',
      description: 'Send me roundups of all the latest clinical and industry news.',
      groupId: '7cfdb3d3-0fbf-4ed8-a058-9beae72276a3',
    },
    {
      id: '632b6f54ae5243fd6c5b92ec',
      label: 'Breaking News',
      description: 'Send me breaking news about research, business, and other developments.',
      groupId: '423213b2-8d3a-44e8-9bc0-2036fb140cb8',
    },
    {
      id: '632b6f7c6fe1916e1695d29c',
      label: 'Market Research Panel',
      description: 'Notify me about ongoing market research activities at LabPulse.com. This confidential service fully complies with our privacy policy.',
      groupId: '7ae331cb-7736-4bd6-9af9-400c5a1bcee5',
    },
    {
      id: '632b6f96ae524321925b92ed',
      label: 'Spotlight',
      description: 'The LabPulse Spotlight can help you make the most of your LabPulse membership. Get notifications about new content, services, or educational resources designed to help you sharpen your skills and grow professionally. Join the Spotlight today!',
      groupId: '63077630-7fc8-4fa7-bcd8-f1ebaab0a7a9',
    },
  ],
};

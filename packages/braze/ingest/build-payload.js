const { get, getAsArray } = require('@parameter1/base-cms-object-path');
const fieldsQuery = require('./graphql/query/fields');

const getQuestions = async (idx) => {
  const { data } = await idx.client.query({ query: fieldsQuery });
  return getAsArray(data, 'fields.edges')
    .map(({ node }) => node)
    .filter((n) => n.type === 'select')
    .filter((n) => get(n, 'externalId.namespace.type') === 'attribute' && get(n, 'externalId.namespace.tenant' === 'smg'));
};

module.exports = async (idx, { userData, questions }) => {
  // load idx questions
  const fields = await getQuestions(idx);

  // Build question payload
  const customSelectAnswers = Object.keys(questions).reduce((arr, key) => {
    const v = questions[key];
    if (!v || !v.length) return arr;
    const q = fields.find((f) => get(f, 'externalId.identifier.value') === key);
    if (!q) throw new Error(`Unable to find a question for key ${key}.`);
    return [
      ...arr,
      { fieldId: q.id, optionIds: Array.isArray(v) ? v : [v] },
    ];
  }, []);

  return {
    ...userData,
    customSelectAnswers,
  };
};

const { asyncRoute } = require('@parameter1/base-cms-utils');
const { get } = require('@parameter1/base-cms-object-path');
const gql = require('graphql-tag');

const query = gql`
  query allPublishedContent($input: AllPublishedContentQueryInput!) {
    allPublishedContent(input: $input){
      edges {
        node {
          id
        }
      }
    }
  }
`;

/**
 * @param {object} req The Express request object.
 */
async function findPost(req) {
  const { apollo, query: params } = req;
  const filteredParams = Object.keys((params)).filter(key => key.match(/itemid/i));
  if (filteredParams.length) {
    const variables = { input: { customAttributes: { key: 'boItemId', value: params[filteredParams[0]] }, withSite: true } };
    const { data } = await apollo.query({ query, variables });
    const { allPublishedContent } = data;
    const edges = get(allPublishedContent, 'edges');
    if (edges.length) {
      return { from: `/?ItemID=${params[filteredParams[0]]}`, to: `/${edges[0].node.id}`, code: 301 };
    }
    return null;
  }
  return null;
}

module.exports = () => asyncRoute(async (req, res, next) => {
  const { query: reqQuery } = req;
  if (!reqQuery) return next();
  const redirect = await findPost(req);
  if (redirect) return res.redirect(redirect.code, redirect.to);
  return next();
});

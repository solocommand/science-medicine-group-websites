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
  const filteredParams = Object.keys((params)).filter(key => key.match(/itemid|rid|vendorid/i));
  if (filteredParams.length) {
    // Break up an unencoded query string if necessary.
    const value = filteredParams[0].match(/(itemid|rid|vendorid)=[0-9]+/i)
      ? filteredParams[0].match(/(itemid|rid|vendorid)=[0-9]+/i)[0].split('=').pop()
      : params[filteredParams[0]];
    const input = {
      customAttributes: { key: 'boItemId', value },
      withSite: true,
    };
    if (filteredParams[0].match(/itemid/i)) {
      input.includeContentTypes = ['Article'];
    } else if (filteredParams[0].match(/vendorid/i)) {
      input.includeContentTypes = ['Company'];
    } else if (filteredParams[0].match(/rid/i)) {
      input.includeContentTypes = ['Event'];
    }
    const variables = { input };
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

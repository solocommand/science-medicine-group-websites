const { log } = console;

/**
 *
 * @param {BatchConfig} args
 * @returns {Promise}
 */
const batch = async ({
  handler = () => {},
  limit,
  name,
  page = 1,
  previous,
  retriever = () => {},
  totalCount = 0,
} = {}) => {
  if (!totalCount) return;
  const pages = Math.ceil(totalCount / limit);
  const skip = (page - 1) * limit;
  log(`Handling batch ${page} of ${pages} (L/S ${limit}/${skip}) for '${name}'`);

  const results = await retriever({
    limit,
    name,
    page,
    pages,
    previous,
    skip,
  });

  await handler({ results, name });
  if (page < pages) {
    await batch({
      handler,
      limit,
      name,
      page: page + 1,
      previous: results,
      retriever,
      totalCount,
    });
  }
};

module.exports = batch;

/**
 * @typedef BatchConfig
 * @prop {HandlerCallback} handler
 * @prop {number} limit
 * @prop {string} name The batch config name
 * @prop {number} page
 * @prop {any} previous The last retrieved result set
 * @prop {RetrieverCallback} retriever
 * @prop {number} totalCount
 *
 * @callback RetrieverCallback
 * @param {RetrieverArgs} args
 * @typedef RetrieverArgs
 * @prop {number} limit
 * @prop {string} name
 * @prop {number} page
 * @prop {number} pages
 * @prop {any} previous
 * @prop {number} skip
 *
 * @callback HandlerCallback
 * @param {HandlerArgs} args
 * @typedef HandlerArgs
 * @prop {any} results
 * @prop {string} name
 */

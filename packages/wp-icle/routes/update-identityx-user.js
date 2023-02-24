const debug = require('debug')('wp-icle');
const { json } = require('express');
const { asyncRoute } = require('@parameter1/base-cms-utils');
const { getAsArray } = require('@parameter1/base-cms-object-path');
const loadUserQuery = require('../graphql/queries/load-user');
const identityXCustomQuestions = require('../graphql/queries/idx-app-custom-questions');

module.exports = (app, config) => {
  const { hookUri, apiKey, idxConfig } = config;
  /**
   * @todo avoid recursion between hook invocations
   * @todo investigate SQS intermediary with lambda execution.
   */
  app.post('/api/update-identityx-user', json(), asyncRoute(async (req, res) => {
    try {
      debug(req.body);
      res.json({
        name: 'user-update',
        // payload,
        // user: user.id,
      });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }));
};

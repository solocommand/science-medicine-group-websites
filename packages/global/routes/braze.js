const { asyncRoute } = require('@parameter1/base-cms-utils');
const fetch = require('node-fetch');
const { json } = require('express');
const template = require('../templates/user/subscribe');

const { log } = console;

module.exports = (app) => {
  const { apiHost, apiKey } = app.locals.site.getAsObject('braze');
  const headers = {
    'content-type': 'application/json',
    authorization: `Bearer ${apiKey}`,
  };

  const buildQuestions = async (email) => {
    // Create a copy of the subscription groups before applying user preferences
    const questions = app.locals.site.getAsArray('braze.subscriptionGroups')
      .map(obj => ({ ...obj }));
    if (email) {
      try {
        const r = await fetch(`${apiHost}/subscription/user/status?email=${email}`, { headers });
        const { users } = await r.json();
        if (users) {
          // If the user includes a + in their email, Braze breaks and can't find them.
          // aka /user/subscribe?email=jennifer.avolio%2Btest%40bioinfoinc.com
          users.forEach((entry) => {
            const groups = entry.subscription_groups || [];
            groups.forEach((group) => {
              const question = questions.find(q => q.groupId === group.id);
              if (question) question.checked = group.status === 'Subscribed';
            });
          });
        }
      } catch (e) {
        // Warn but do nothing if the user lookup failed
        log('Unable to look up braze user state', email, e);
      }
    }
    return questions;
  };

  app.get('/user/subscribe/check', json(), asyncRoute(async (req, res) => {
    const { body } = req;
    const { email } = body;
    const questions = await buildQuestions(email);
    res.json(questions);
  }));

  app.get('/user/subscribe', asyncRoute(async (req, res) => {
    const questions = await buildQuestions(req.query.email);
    res.marko(template, { questions });
  }));

  app.post('/user/subscribe', json(), asyncRoute(async (req, res) => {
    try {
      const { body } = req;
      const { email, optIns } = body;

      const idxUser = await req.identityX.createAppUser({ email });
      // @todo do we need to create a Braze user first?

      const r = await fetch(`${apiHost}/v2/subscription/status/set`, {
        method: 'post',
        headers,
        body: JSON.stringify({
          subscription_groups: Object.entries(optIns).map(([id, status]) => ({
            subscription_group_id: id,
            subscription_state: status ? 'subscribed' : 'unsubscribed',
            external_ids: [idxUser.id],
            emails: [email],
          })),
        }),
      });
      const response = await r.json();
      if (!r.ok) {
        if (response.message) throw new Error(response.message);
        throw new Error(`API request was unsuccessful: ${r.status} ${r.statusText}`);
      }
      res.status(200).send(response);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  }));
};

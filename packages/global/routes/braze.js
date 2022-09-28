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

  const createBrazeUser = async (email, externalId) => {
    const r = await fetch(`${apiHost}/users/track`, {
      method: 'post',
      headers,
      body: JSON.stringify({
        attributes: [{
          email,
          external_id: externalId,
        }],
      }),
    });
    const response = await r.json();
    if (!r.ok) {
      if (response.message) throw new Error(response.message);
      throw new Error(`API request was unsuccessful: ${r.status} ${r.statusText}`);
    }
    return response;
  };

  app.get('/user/subscribe/check', json(), asyncRoute(async (req, res) => {
    const { email } = req.query;
    const questions = app.locals.site.getAsArray('braze.subscriptionGroups')
      .map(obj => ({ ...obj }));
    const optIns = questions.reduce((obj, q) => ({ ...obj, [q.groupId]: false }), {});

    if (email) {
      try {
        const r = await fetch(`${apiHost}/subscription/user/status?email=${encodeURIComponent(email)}`, { headers });
        const { users } = await r.json();
        if (users) {
          users.forEach((entry) => {
            const groups = entry.subscription_groups || [];
            groups.forEach((group) => {
              optIns[group.id] = group.status === 'Subscribed';
            });
          });
        }
      } catch (e) {
        // Warn but do nothing if the user lookup failed
        log('Unable to look up braze user state', email, e);
      }
    }
    res.json(optIns);
  }));

  app.get('/user/subscribe', (_, res) => { res.marko(template); });

  app.post('/user/subscribe', json(), asyncRoute(async (req, res) => {
    try {
      const { body } = req;
      const { email, optIns } = body;

      const idxUser = await req.identityX.createAppUser({ email });
      await createBrazeUser(email, idxUser.id);

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

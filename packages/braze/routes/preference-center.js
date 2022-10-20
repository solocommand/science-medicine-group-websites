const { asyncRoute } = require('@parameter1/base-cms-utils');
const { validateToken } = require('@parameter1/base-cms-marko-web-recaptcha');
const { json } = require('express');
const { RECAPTCHA_V3_SECRET_KEY } = require('../env');
const template = require('../templates/preference-center');
const updateAppUser = require('../graphql/mutations/idx-user-update-receive-email');

const { log } = console;
const buildAnswers = (questions, optIns) => {
  const questionMap = questions.reduce((map, q) => {
    map.set(q.groupId, q.id);
    return map;
  }, new Map());
  return Object.entries(optIns).reduce((arr, [brazeId, value]) => {
    const fieldId = questionMap.get(brazeId);
    if (!fieldId) return arr;
    return [...arr, { fieldId, value }];
  }, []);
};

module.exports = (app) => {
  const createIdentityXUser = async (email, svc, answers) => {
    const user = await svc.createAppUser({ email });
    const apiToken = svc.config.getApiToken();
    if (!apiToken) throw new Error('Unable to set opt-in state: No IdentityX API token has been configured.');
    await svc.client.mutate({
      mutation: updateAppUser,
      variables: {
        input: {
          id: user.id,
          payload: { email, receiveEmail: true },
        },
        answers: {
          id: user.id,
          answers,
        },
      },
      context: { apiToken },
    });
    return user;
  };

  app.get('/user/subscribe/check', json(), asyncRoute(async (req, res) => {
    const { braze } = req;
    const { email } = req.query;
    const questions = app.locals.site.getAsArray('braze.subscriptionGroups');
    const optIns = questions.reduce((obj, q) => ({ ...obj, [q.groupId]: false }), {});

    if (email) {
      try {
        const { users } = await braze.getSubscriptionStatus(email);
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
      const { body, braze } = req;
      const { email, optIns, token } = body;
      // @todo read questions from IdX context
      const questions = app.locals.site.getAsArray('braze.subscriptionGroups');
      const answers = buildAnswers(questions, optIns);

      await validateToken({ token, secretKey: RECAPTCHA_V3_SECRET_KEY, actions: ['brazePreferenceCenter'] });
      const idxUser = await createIdentityXUser(email, req.identityX, answers);
      await braze.trackUser(email, idxUser.id);

      const response = await braze.updateSubscriptions(email, idxUser.id, optIns);
      res.status(200).send(response);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  }));
};

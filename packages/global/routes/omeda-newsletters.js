const { Router } = require('express');
const { asyncRoute } = require('@parameter1/base-cms-utils');
const jsonErrorHandler = require('@parameter1/base-cms-marko-web/express/json-error-handler');
const createError = require('http-errors');
const { json } = require('body-parser');
const fetch = require('node-fetch');
const recaptcha = require('../config/recaptcha');

const { isArray } = Array;

module.exports = (app) => {
  const router = Router();
  router.use(json());

  router.post('/', asyncRoute(async (req, res) => {
    const {
      token,
      email,
      companyName,
      postalCode,
      deploymentTypeIds,
      demographics,
    } = req.body;
    if (!email) throw createError(400, 'An email address is required.');
    if (!token) throw createError(400, 'A verification token is required.');

    const params = new URLSearchParams();
    params.append('response', token);
    params.append('secret', recaptcha.secretKey);
    const recaptchaRes = await fetch('https://www.google.com/recaptcha/api/siteverify', { method: 'post', mode: 'no-cors', body: params });
    const recaptchaData = await recaptchaRes.json();
    if (!recaptchaData.success || recaptchaData.action !== 'newsletterSignup' || recaptchaData.score < 0.5) throw createError(400, 'Unable to validate request because reCAPTCHA failed.');

    const { encryptedCustomerId } = await req.$omedaRapidIdentify({
      email,
      ...(companyName && { companyName }),
      ...(postalCode && { postalCode }),
      ...(isArray(deploymentTypeIds) && deploymentTypeIds.length && { deploymentTypeIds }),
      ...(isArray(demographics) && demographics.length && { demographics }),
    });
    res.json({ encryptedCustomerId });
  }));

  router.use(jsonErrorHandler());
  app.use('/__omeda/newsletter-signup', router);
};

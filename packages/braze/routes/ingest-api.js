const debug = require('debug')('braze');
const { json } = require('express');
const { asyncRoute } = require('@parameter1/base-cms-utils');
const { get } = require('@parameter1/base-cms-object-path');
const Joi = require('@parameter1/joi');
const { validate } = require('@parameter1/joi/utils');

/** Keys allowing authorization of alternate behavior */
const validKeys = JSON.parse(process.env.IDENTITYX_APP_API_KEYS || '[]');

/**
 * Ensures a valid auth key is present to modify default behavior
 *
 * @param {import('express').Request} req
 * @param {Boolean} defaultValue
 * @returns
 */
const validateAuthed = (req, defaultValue) => (v) => {
  if (v === defaultValue) return v;

  const authorization = req.get('authorization');
  if (!authorization) {
    const err = new Error('Authentication required to change this behavior.');
    err.statusCode = 401;
    throw err;
  }

  const [, key] = /^Bearer (.+)$/.exec(authorization) || [];
  if (!validKeys.includes(key)) {
    const err = new Error('Unauthorized');
    err.statusCode = 403;
    throw err;
  }

  return v;
};

const validateCountryCode = (v) => {
  debug('validateCountryCode', v);
  // Read country/region value files
  throw new Error('NYI');
};
const validateRegionCode = (v) => {
  debug('validateRegionCode', v);
  // Read country/region value files
  throw new Error('NYI');
};
const validateCustomQuestionAnswer = (v, opts) => {
  const key = get(opts, 'state.path.0');
  // look up the questions from the IdentityX context.
  throw new Error(`${key} validation NYI`);
};

/**
 * @param {import('express').Application} app The Express app instance
 */
module.exports = (app) => {
  /**
   * Handles incoming requests to insert a user and return an IdentityX ID
   */
  app.post('/api/identity-x', json(), asyncRoute(async (req, res) => {
    try {
      const {
        // Standard fields
        email,
        givenName,
        familyName,
        city,
        countryCode,
        regionCode,
        postalCode,
        organization,
        organizationTitle,
        phoneNumber,

        // Custom Questions
        organizationType,
        profession,
        technologies,
        specialties,

        // Behavior
        automaticOptIn,
        sendVerificationEmail,
        overwriteIfPresent,
        automaticConfirm,
      } = await validate(Joi.object({
        email: Joi.string().email().lowercase().required(),

        // Optional fields, used when inserting a new user or overwriting
        givenName: Joi.string(),
        familyName: Joi.string(),
        city: Joi.string(),
        countryCode: Joi.string().custom(validateCountryCode),
        regionCode: Joi.string().custom(validateRegionCode),
        postalCode: Joi.string(),
        organization: Joi.string(),
        organizationTitle: Joi.string(),

        // IdX question/answers
        organizationType: Joi.string().custom(validateCustomQuestionAnswer),
        profession: Joi.string().custom(validateCustomQuestionAnswer),
        technologies: Joi.string().custom(validateCustomQuestionAnswer),
        specialties: Joi.string().custom(validateCustomQuestionAnswer),

        // Behavior flags. An administrative API key is required to modify from the defaults.
        automaticOptIn: Joi.boolean().default(true)
          .description('Should the user be automatically added to the default subscription group?')
          .custom(validateAuthed(req, true)),
        sendVerificationEmail: Joi.boolean().default(true)
          .description('Should the user receive the IdentityX verification email?')
          .custom(validateAuthed(req, true)),
        overwriteIfPresent: Joi.boolean().default(false)
          .description('Should the supplied values overwrite existing profile data and sync to Braze?')
          .custom(validateAuthed(req, false)),
        automaticConfirm: Joi.boolean().default(false)
          .description('Should the user be automatically moved out of the unconfirmed subscription group?')
          .custom(validateAuthed(req, false)),
      }), req.body);

      res.json({
        email,
        givenName,
        familyName,
        city,
        countryCode,
        regionCode,
        postalCode,
        organization,
        organizationTitle,
        phoneNumber,

        // Custom Questions
        organizationType,
        profession,
        technologies,
        specialties,

        // Behavior
        automaticOptIn,
        sendVerificationEmail,
        overwriteIfPresent,
        automaticConfirm,
      });
    } catch (error) {
      debug('error', error);
      const statusCode = get(error, 'details.0.context.error.statusCode') || error.statusCode || 500;
      res.status(statusCode).json({ error });
    }
  }));
};

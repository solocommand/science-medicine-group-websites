const { json } = require('express');
const { asyncRoute } = require('@parameter1/base-cms-utils');
const Joi = require('@parameter1/joi');
const { validate } = require('@parameter1/joi/utils');

/**
 *
 * @param {import('express').Request} req
 * @param {Boolean} defaultValue
 * @returns
 */
const validateAuthed = (req, defaultValue) => (v, opts) => {
  console.log('validateAuthed', v, opts, defaultValue);
  return false;
  // if (req.get('authorization') !== `Bearer ${config.apiKey}`) {
  //   res.status(401).json({ error: 'API key is missing or invalid.' });
  //   return;
  // }
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
      /** @type {import('../service.js')} Braze */
      const {
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
        countryCode: Joi.string().validate(() => false),
        regionCode: Joi.string().validate(() => false),
        postalCode: Joi.string(),
        organization: Joi.string(),
        organizationTitle: Joi.string(),

        // IdX question/answers
        organizationType: Joi.string().validate(() => false),
        professio: Joi.string().validate(() => false),
        technologies: Joi.string().validate(() => false),
        specialties: Joi.string().validate(() => false),

        // Behavior flags. An administrative API key is required to modify from the defaults.
        automaticOptIn: Joi.boolean().default(true)
          .description('Should the user be automatically added to the default subscription group?')
          .validate(validateAuthed(req, true)),
        sendVerificationEmail: Joi.boolean().default(true)
          .description('Should the user receive the IdentityX verification email?')
          .validate(validateAuthed(req, true)),
        overwriteIfPresent: Joi.boolean().default(false)
          .description('Should the supplied values overwrite existing profile data and sync to Braze?')
          .validate(validateAuthed(req, false)),
        automaticConfirm: Joi.boolean().default(false)
          .description('Should the user be automatically moved out of the unconfirmed subscription group?')
          .validate(validateAuthed(req, false)),
      }));

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
    } catch (e) {
      console.log(e);
      res.status(e.code || 500).json({
        error: {
          ...e,
          code: e.code || 500,
          message: e.message,
        },
      });
    }
  }));
};

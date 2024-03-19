const Joi = require('@parameter1/joi');
const { get } = require('@parameter1/base-cms-object-path');

/**
 * @typedef {import('@parameter1/base-cms-marko-web-identity-x/service')} IdentityX
 * @typedef {import('express').Request} Request
 * @typedef {Request & RequestContextProps} RequestContext
 * @typedef RequestContextProps
 * @prop {IdentityX} identityX
 * @prop {import('../service')} braze
 *
 * @param {RequestContext} req
 */
module.exports = (req) => {
  const { identityX, braze } = req;

  /**
   * @param {*} v
   * @param {import('joi').CustomHelpers} helpers
   */
  const customQuestionSchema = Joi.string().custom(async (v, helpers) => {
    const key = get(helpers, 'state.path.0');
    const questions = await braze.getDemographicQuestions(identityX);
    const question = questions.find((q) => q.externalId === key);
    if (!question) throw new Error(`Field ${key} is not present. Value cannot be accepted.`);
    // if (!question.active) throw new Error(`Field ${key} is not active. Cannot accept value.`);
    const answer = question.options.find((opt) => opt.externalIdentifier === v);
    if (!answer) throw new Error(`"${v}" is not a valid option for field "${key}."`);
    return answer.id;
  });

  return Joi.object({
    email: Joi.string().email().lowercase().required(),

    // Optional fields, used when inserting a new user or overwriting
    givenName: Joi.string().allow(''),
    familyName: Joi.string().allow(''),
    street: Joi.string().allow(''),
    addressExtra: Joi.string().allow(''),
    city: Joi.string().allow(''),
    countryCode: Joi.string().allow('').example('US')
      .description('An ISO 3166-1 alpha-2 country code.'),
    regionCode: Joi.string().allow('')
      .example('WI')
      .description('An ISO 3166-2 region code.'),
    postalCode: Joi.string().allow(''),
    organization: Joi.string().allow(''),
    organizationTitle: Joi.string().allow(''),
    phoneNumber: Joi.string().allow(''),

    // IdX question/answers
    org_type: customQuestionSchema,
    profession: customQuestionSchema,
    technologies: Joi.array().items(customQuestionSchema),
    subspecialties: Joi.array().items(customQuestionSchema),

    brazeCustomAttributes: Joi.object({
      last_email_activity_legacy: Joi.string.allow(''),
      outside_source: Joi.string.allow(''),
    }).default({}),

    subscriptions: Joi.object().pattern(
      Joi.string().required(),
      Joi.boolean().default(false),
    ).default({}),

    // Behavior flags. An administrative API key is required to modify from the defaults.
    automaticOptIn: Joi.boolean().default(false)
      .description('Should the user be automatically added to the default subscription group?'),
    sendVerificationEmail: Joi.boolean().default(false)
      .description('Should the user receive the IdentityX verification email?'),
    automaticConfirm: Joi.boolean().default(false)
      .description('Should the user be automatically moved out of the unconfirmed subscription group?'),
    updateBraze: Joi.boolean().default(true)
      .description('Should the user data be automatically synced to Braze?'),
  });
};

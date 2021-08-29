const Joi = require('joi');
const { regExpEnum } = require('../constants');

const loginDataValidator = Joi.object({
    password: Joi.string().regex(regExpEnum.PASSWORD_REGEX).trim().required(),
    email: Joi.string().regex(regExpEnum.EMAIL_REGEX).trim().required(),
});

module.exports = { loginDataValidator };

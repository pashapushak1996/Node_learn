const Joi = require('joi');

const { userRolesEnum, regExpEnum } = require('../constants');

const createValidator = Joi.object({
    name: Joi.string().alphanum().min(2).max(30).trim().required(),
    password: Joi.string().regex(regExpEnum.PASSWORD_REGEX).trim().required(),
    email: Joi.string().regex(regExpEnum.EMAIL_REGEX).trim().required(),
    role: Joi.string().allow(...Object.values(userRolesEnum))
});

const updateValidator = Joi.object({
    name: Joi.string().alphanum().min(2).max(30).trim(),
    email: Joi.string().regex(regExpEnum.EMAIL_REGEX).trim()
});

module.exports = { createValidator, updateValidator };

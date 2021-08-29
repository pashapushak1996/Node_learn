const Joi = require('joi');

const { constants } = require('../config');
const { userRolesEnum } = require('../config');

const createValidator = Joi.object({
    name: Joi.string().alphanum().min(2).max(30).trim().required(),
    password: Joi.string().regex(constants.PASSWORD_REGEX).trim().required(),
    email: Joi.string().regex(constants.EMAIL_REGEX).trim().required(),
    role: Joi.string().allow(...Object.values(userRolesEnum))
});

const updateValidator = Joi.object({
    name: Joi.string().alphanum().min(2).max(30).trim(),
    email: Joi.string().regex(constants.EMAIL_REGEX).trim()
});

module.exports = { createValidator, updateValidator };

const Joi = require('joi');

const { regexpEnum } = require('../constant');

module.exports = {
    password: Joi.string().regex(regexpEnum.PASSWORD_REGEX).required().trim(),
    email: Joi.string().regex(regexpEnum.EMAIL_REGEX).required().trim(),
};

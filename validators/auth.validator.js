const Joi = require('joi');
const { constants } = require('../config');

const loginDataValidator = Joi.object({
    password: Joi.string().regex(constants.PASSWORD_REGEX).trim().required(),
    email: Joi.string().regex(constants.EMAIL_REGEX).trim().required(),
});

module.exports = { loginDataValidator };

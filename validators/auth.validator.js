const Joi = require('joi');

const { regexpEnum } = require('../constant');

const checkAuthData = Joi.object({
    email: Joi.string().regex(regexpEnum.EMAIL_REGEX).required().trim(),
    password: Joi.string().regex(regexpEnum.PASSWORD_REGEX).required().trim(),
});

const checkPass = ({
    password: Joi.string().regex(regexpEnum.PASSWORD_REGEX).required().trim()
});

module.exports = {
    checkAuthData,
    checkPass
};

const Joi = require('joi');

const validatorVariables = require('./validator-variables.enum');

const checkAuthData = Joi.object({
    email: validatorVariables.email,
    password: validatorVariables.password,
});

const checkPass = Joi.object({
    password: validatorVariables.password
});

const checkChangePassData = Joi.object({
    oldPassword: validatorVariables.password,
    newPassword: validatorVariables.password
});

const checkMail = Joi.object({
    email: validatorVariables.email
});

module.exports = {
    checkAuthData,
    checkPass,
    checkMail,
    checkChangePassData
};

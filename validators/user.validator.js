const Joi = require('joi');

const { userRolesEnum } = require('../constant');
const validatorVariables = require('./validator-variables.enum');

const createUser = Joi.object({
    name: Joi
        .string()
        .required()
        .trim(),
    email:
    validatorVariables.email,
    password: validatorVariables.password
        .when('role',
            {
                is: userRolesEnum.USER,
                then: Joi.required()
            }),
    role: Joi
        .string()
        .default(userRolesEnum.USER)
        .valid(...Object.values(userRolesEnum)),
});

const updateUser = Joi.object({
    name: Joi.string().trim(),
    email: validatorVariables.email
});

module.exports = { createUser, updateUser };

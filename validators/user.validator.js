const Joi = require('joi');

const { userRolesEnum, regexpEnum } = require('../constant');

const createUser = Joi.object({
    name: Joi
        .string()
        .required()
        .trim(),
    email: Joi
        .string()
        .regex(regexpEnum.EMAIL_REGEX)
        .required()
        .trim(),
    password: Joi
        .string()
        .regex(regexpEnum.PASSWORD_REGEX)
        .trim()
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
    email: Joi.string().trim().regex(regexpEnum.EMAIL_REGEX)
});

module.exports = { createUser, updateUser };

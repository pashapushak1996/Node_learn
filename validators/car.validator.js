const Joi = require('joi');

const { carColorsEnum } = require('../constants');
const { variables } = require('../config');

const findAndCreateCarValidator = Joi.object({
    producer: Joi
        .string()
        .min(2)
        .max(50)
        .trim()
        .when('isQuery', { is: false, then: Joi.required() }),
    model: Joi
        .string()
        .min(1)
        .max(50)
        .trim()
        .when('isQuery', { is: false, then: Joi.required() }),
    price: Joi
        .string()
        .min(4)
        .max(20)
        .trim(),
    year: Joi
        .number()
        .integer()
        .min(variables.CURRENT_YEAR - 250)
        .max(variables.CURRENT_YEAR),
    color: Joi
        .valid(...Object.values(carColorsEnum)),
    isQuery: Joi
        .boolean()
        .default(false)
});

const updateCarValidator = Joi.object({
    price: Joi
        .string()
        .min(4)
        .max(20)
        .trim(),
    color: Joi
        .string()
        .valid(...Object.values(carColorsEnum))
});

module.exports = {
    findAndCreateCarValidator, updateCarValidator
};

const Joi = require('joi');

const { variables: { CURRENT_YEAR } } = require('../config');

const createCarValidator = Joi.object({
    producer: Joi.string().required().trim(),
    model: Joi.string().required().trim(),
    color: Joi.string(),
    year: Joi.string().min(CURRENT_YEAR - 250).max(CURRENT_YEAR)
});

module.exports = {
    createCarValidator
};

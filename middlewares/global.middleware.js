const { statusCodesEnum, middlewareParamEnum } = require('../constants');
const { ErrorHandler, errorMessages } = require('../error');

const dynamicValidatorMiddleware = (
    validatorType,
    validateIn = middlewareParamEnum.REQ_BODY,
    isQuery = false
) => (req, res, next) => {
    try {
        const { error } = isQuery
            ? validatorType.validate({ ...req[validateIn], isQuery })
            : validatorType.validate(req[validateIn]);

        const errorMessage = validateIn === 'body' ? errorMessages.REQ_BODY_IS_WRONG : errorMessages.NOT_FOUND_ERR;

        if (error) {
            throw new ErrorHandler(statusCodesEnum.BAD_REQUEST, errorMessage);
        }

        next();
    } catch (e) {
        next(e);
    }
};

module.exports = {
    dynamicValidatorMiddleware
};

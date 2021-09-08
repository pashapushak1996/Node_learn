const { statusCodeEnum } = require('../constant');
const { errorMessageEnum, ErrorHandler } = require('../error');

const generalMiddleware = {
    dynamicValidator: (validatorName, validateIn = 'body') => (req, res, next) => {
        try {
            const { error } = validatorName.validate(req[validateIn]);

            if (error) {
                throw new ErrorHandler(statusCodeEnum.BAD_REQUEST, errorMessageEnum.NO_TOKEN);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};

module.exports = generalMiddleware;

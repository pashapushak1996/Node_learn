const { ErrorHandler } = require('../error');
const { errorMessages } = require('../error');
const { statusCodesEnum } = require('../config');
const { authValidator } = require('../validators');

const authMiddleware = {
    checkLoginUserData: (req, res, next) => {
        try {
            const { error } = authValidator.loginDataValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(statusCodesEnum.BAD_REQUEST, errorMessages.REQ_BODY_IS_WRONG);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};

module.exports = authMiddleware;

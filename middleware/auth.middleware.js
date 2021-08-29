const { User } = require('../dataBase');
const { ErrorHandler } = require('../error');
const { errorMessages } = require('../error');
const { statusCodesEnum } = require('../constants');
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
    },
    isEmailExist: async (req, res, next) => {
        try {
            const { email } = req.body;
            const user = await User.findOne({ email }).select('+password');

            if (!user) {
                throw new ErrorHandler(statusCodesEnum.NOT_FOUND, errorMessages.EMAIL_ALREADY_EXIST);
            }

            req.currentUser = user;

            next();
        } catch (e) {
            next(e);
        }
    }
};

module.exports = authMiddleware;

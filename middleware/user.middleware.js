const { User } = require('../dataBase');
const { ErrorHandler, errorMessages } = require('../error');
const { statusCodesEnum } = require('../config');
const { userValidator } = require('../validators');

const userMiddleware = {
    isUserPresent: async (req, res, next) => {
        try {
            const { user_id } = req.params;

            const currentUser = await User.findById({ _id: user_id }).lean();

            if (!currentUser) {
                throw new ErrorHandler(statusCodesEnum.NOT_FOUND, errorMessages.NOT_FOUND_USER);
            }

            req.currentUser = currentUser;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUniqueEmail: async (req, res, next) => {
        try {
            const { email } = req.body;

            const user = await User.findOne({ email });

            if (user) {
                throw new ErrorHandler(statusCodesEnum.CONFLICT, errorMessages.EMAIL_ALREADY_EXIST);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    checkCreateUserData: (req, res, next) => {
        try {
            const { error } = userValidator.createValidator.validate(req.body);
            if (error) {
                throw new ErrorHandler(statusCodesEnum.BAD_REQUEST, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    checkUpdateUserData: (req, res, next) => {
        try {
            const { error } = userValidator.updateValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(statusCodesEnum.BAD_REQUEST, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};

module.exports = userMiddleware;

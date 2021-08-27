const { User } = require('../dataBase');
const ErrorHandler = require('../errors/ErrorHandler');

const statusCodes = require('../config/status-codes.enum');
const userErrorMessages = require('../config/userError.messages');

const userMiddleware = {
    isUserPresent: async (req, res, next) => {
        try {
            const { userId } = req.params;
            const user = await User.findById(userId);

            if (!user) {
                throw new ErrorHandler(statusCodes.NOT_FOUND, userErrorMessages.USER_NOT_FOUND);
            }

            req.currentUser = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    isValidEmail: (req, res, next) => {
        try {
            const { email } = req.body;
            const domains = [
                'com',
                'org',
                'edu',
                'gov',
                'net'
            ];
            const domain = email.split('.').pop();

            const isValidEmail = domains.includes(domain) && email.includes('@');

            if (!isValidEmail) {
                throw new ErrorHandler(statusCodes.BAD_REQUEST, userErrorMessages.WRONG_EMAIL);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkPassword: (req, res, next) => {
        try {
            const { password } = req.body;
            const isValidPassword = password.length >= 4;

            if (!isValidPassword) {
                throw new ErrorHandler(statusCodes.BAD_REQUEST, userErrorMessages.WRONG_PASSWORD_LENGTH);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserDataFill: (req, res, next) => {
        try {
            const { name, email, password, } = req.body;

            const isDataPresent = name && email && password;

            if (!isDataPresent) {
                throw new ErrorHandler(statusCodes.BAD_REQUEST, userErrorMessages.REQUIRED);
            }

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
                throw new ErrorHandler(statusCodes.OK, userErrorMessages.IS_EXIST);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};

module.exports = userMiddleware;

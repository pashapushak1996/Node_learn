const User = require('../dataBase/User');
const ErrorHandler = require('../errors/ErrorHandler');

const userMiddleware = {
    isUserPresent: async (req, res, next) => {
        try {
            const { userId } = req.params;
            const user = await User.findById(userId);

            if (!user) {
                throw new ErrorHandler(404, 'Not found');
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
                throw new ErrorHandler(401, 'Wrong email');
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    isPasswordPresent: (req, res, next) => {
        try {
            const { password } = req.body;
            const isValidPassword = password.length >= 4;

            if (!isValidPassword) {
                throw new ErrorHandler(400, 'Your password must be at least 6 characters');
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    isUserDataPresent: (req, res, next) => {
        try {
            const { name, email, password, } = req.body;

            const isDataPresent = name && email && password;

            if (!isDataPresent) {
                throw new ErrorHandler(400, 'Name, email, password is required');
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    isUniqueEmail: (req, res, next) => {
        try {
            const { email } = req.body;
            const user = User.findOne({ email });

            if (!user) {
                throw new ErrorHandler(200, 'User is exist');
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};

module.exports = userMiddleware;

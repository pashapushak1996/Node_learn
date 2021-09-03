const { ErrorHandler, errorMessages } = require('../error');
const { statusCodesEnum, middlewareParamEnum } = require('../constants');
const { User } = require('../dataBase');

const userMiddleware = {
    throwIfUserExist: (req, res, next) => {
        try {
            const { currentUser } = req;

            if (currentUser) {
                throw new ErrorHandler(statusCodesEnum.CONFLICT, errorMessages.USER_ALREADY_EXIST);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    throwIfUserNotExist: (req, res, next) => {
        try {
            const { currentUser } = req;

            if (!currentUser) {
                throw new ErrorHandler(statusCodesEnum.CONFLICT, errorMessages.NOT_FOUND_USER);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    getUserByDynamicParams: (
        paramName,
        searchIn = middlewareParamEnum.REQ_BODY,
        dbFiled = paramName
    ) => async (req, res, next) => {
        try {
            const value = req[searchIn][paramName];

            const currentUser = await User
                .findOne({ [dbFiled]: value })
                .lean()
                .select('+password');

            req.currentUser = currentUser;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserRole: (roles = []) => (req, res, next) => {
        try {
            const { loggedUser, currentUser } = req;

            const isLoggedUser = loggedUser._id.toString() === currentUser._id.toString();

            if (isLoggedUser || roles.includes(currentUser.role)) {
                next();
                return;
            }

            throw new ErrorHandler(statusCodesEnum.FORBIDDEN, errorMessages.ACCESS_DENIED);
        } catch (e) {
            next(e);
        }
    },

};

module.exports = userMiddleware;

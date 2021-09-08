const { statusCodeEnum, middlewareParamEnum } = require('../constant');
const { dbModels: { User } } = require('../dataBase');
const { ErrorHandler, errorMessageEnum } = require('../error');

const userMiddleware = {
    getUserByDynamicParam: (
        paramName,
        searchIn = middlewareParamEnum.BODY,
        dbFiled = paramName
    ) => async (req, res, next) => {
        try {
            const value = req[searchIn][paramName];

            const user = await User.findOne({ [dbFiled]: value })
                .lean()
                .select('+password');

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    throwIfUserNotExist: (req, res, next) => {
        try {
            const { user } = req;

            if (!user) {
                throw new ErrorHandler(statusCodeEnum.NOT_FOUND, errorMessageEnum.USER_NOT_FOUND);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    throwIfUserExist: (req, res, next) => {
        try {
            const { user } = req;

            if (user) {
                throw new ErrorHandler(statusCodeEnum.CONFLICT, errorMessageEnum.EMAIL_IS_EXIST);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkIsLoggedUser: (req, res, next) => {
        try {
            const { params: { userId }, loggedUser } = req;

            const isLoggedUser = loggedUser._id.toString() === userId;

            if (!isLoggedUser) {
                throw new ErrorHandler(statusCodeEnum.FORBIDDEN, errorMessageEnum.ACCESS_DENIED);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserRole: (rolesArray) => (req, res, next) => {
        try {
            const { params: { userId }, loggedUser } = req;

            const isLoggedUser = loggedUser._id.toString() === userId;

            if (isLoggedUser) {
                return next();
            }

            if (!rolesArray.length) {
                return next();
            }

            if (!rolesArray.includes(loggedUser.role)) {
                throw new ErrorHandler(statusCodeEnum.FORBIDDEN, errorMessageEnum.ACCESS_DENIED);
            }
            next();
        } catch (e) {
            next(e);
        }
    },
};

module.exports = userMiddleware;

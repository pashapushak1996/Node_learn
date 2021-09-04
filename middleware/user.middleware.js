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
    }
};

module.exports = userMiddleware;

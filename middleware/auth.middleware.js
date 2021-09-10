const { dbModels } = require('../dataBase');
const {
    middlewareParamEnum,
    statusCodeEnum,
    tokenTypesEnum
} = require('../constant');
const { ErrorHandler, errorMessageEnum } = require('../error');
const { jwtService, passwordService } = require('../service');

const authMiddleware = {
    checkAccessToken: async (req, res, next) => {
        try {
            const access_token = req.get(middlewareParamEnum.AUTHORIZATION);

            if (!access_token) {
                throw new ErrorHandler(statusCodeEnum.FORBIDDEN, errorMessageEnum.NO_TOKEN);
            }

            await jwtService.verifyToken(access_token);

            const tokenFromDB = await dbModels.OAuth.findOne({ access_token });

            if (!tokenFromDB) {
                throw new ErrorHandler(statusCodeEnum.FORBIDDEN, errorMessageEnum.WRONG_TOKEN);
            }

            req.loggedUser = tokenFromDB.user;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try {
            const refresh_token = req.get(middlewareParamEnum.AUTHORIZATION);

            if (!refresh_token) {
                throw new ErrorHandler(statusCodeEnum.FORBIDDEN, errorMessageEnum.NO_TOKEN);
            }

            await jwtService.verifyToken(refresh_token, tokenTypesEnum.REFRESH);

            const tokenFromDB = await dbModels.OAuth.findOne({ refresh_token });

            if (!tokenFromDB) {
                throw new ErrorHandler(statusCodeEnum.FORBIDDEN, errorMessageEnum.WRONG_TOKEN);
            }

            req.loggedUser = tokenFromDB.user;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkActionToken: (tokenType) => async (req, res, next) => {
        try {
            const action_token = req.get(middlewareParamEnum.AUTHORIZATION);

            if (!action_token) {
                throw new ErrorHandler(statusCodeEnum.FORBIDDEN, errorMessageEnum.NO_TOKEN);
            }

            await jwtService.verifyActionToken(action_token, tokenType);

            const tokenFromDB = await dbModels.ActionToken.findOne({ action_token });

            if (!tokenFromDB) {
                throw new ErrorHandler(statusCodeEnum.FORBIDDEN, errorMessageEnum.WRONG_TOKEN);
            }

            req.user = tokenFromDB.user;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkOldPassword: async (req, res, next) => {
        try {
            const { loggedUser, body: { oldPassword } } = req;

            await passwordService.comparePassword(oldPassword, loggedUser.password);
            next();
        } catch (e) {
            next(e);
        }
    }
};

module.exports = authMiddleware;

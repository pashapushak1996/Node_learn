const { authService } = require('../services');
const { statusCodesEnum, middlewareParamEnum, dbModelsEnum } = require('../constants');
const { OAuth } = require('../dataBase');
const { ErrorHandler, errorMessages } = require('../error');

const authMiddleware = {
    checkAccessToken: async (req, res, next) => {
        try {
            const access_token = req.get(middlewareParamEnum.AUTHORIZATION);

            if (!access_token) {
                throw new ErrorHandler(statusCodesEnum.UNAUTHORIZED, errorMessages.NO_TOKEN);
            }

            await authService.verifyToken(access_token);

            const tokenFromDB = await OAuth.findOne({ access_token }).populate(dbModelsEnum.USER);

            if (!tokenFromDB) {
                throw new ErrorHandler(statusCodesEnum.UNAUTHORIZED, errorMessages.NOT_VALID_TOKEN);
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
                throw new ErrorHandler(statusCodesEnum.UNAUTHORIZED, errorMessages.WRONG_TOKEN);
            }

            await authService.verifyToken(refresh_token, middlewareParamEnum.REFRESH);

            const tokenFromDB = await OAuth.findOne({ refresh_token }).populate(dbModelsEnum.USER);

            if (!tokenFromDB) {
                throw new ErrorHandler(statusCodesEnum.UNAUTHORIZED, errorMessages.WRONG_TOKEN);
            }

            req.loggedUser = tokenFromDB.user;

            next();
        } catch (e) {
            next(e);
        }
    }
};

module.exports = authMiddleware;

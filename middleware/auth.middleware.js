const { dbModels } = require('../dataBase');
const { middlewareParamEnum, statusCodeEnum, dbModelsEnum } = require('../constant');
const { ErrorHandler, errorMessageEnum } = require('../error');
const { jwtService } = require('../service');

const authMiddleware = {
    checkAccessToken: async (req, res, next) => {
        try {
            const access_token = req.get(middlewareParamEnum.AUTHORIZATION);

            if (!access_token) {
                throw new ErrorHandler(statusCodeEnum.FORBIDDEN, errorMessageEnum.NO_TOKEN);
            }

            await jwtService.verifyToken(access_token);

            const tokenFromDB = await dbModels.OAuth.findOne({ access_token }).populate(dbModelsEnum.USER);

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

            await jwtService.verifyToken(refresh_token, 'refresh');

            const tokenFromDB = await dbModels.OAuth.findOne({ refresh_token }).populate(dbModelsEnum.USER);

            if (!tokenFromDB) {
                throw new ErrorHandler(statusCodeEnum.FORBIDDEN, errorMessageEnum.WRONG_TOKEN);
            }

            req.loggedUser = tokenFromDB.user;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkActionToken: async (req, res, next) => {
        try {
            const action_token = req.get(middlewareParamEnum.AUTHORIZATION);

            if (!action_token) {
                throw new ErrorHandler(statusCodeEnum.FORBIDDEN, errorMessageEnum.NO_TOKEN);
            }

            await jwtService.verifyToken(action_token, 'action');

            const tokenFromDB = await dbModels.ActionToken.findOne({ action_token }).populate(dbModelsEnum.USER);

            if (!tokenFromDB) {
                throw new ErrorHandler(statusCodeEnum.FORBIDDEN, errorMessageEnum.WRONG_TOKEN);
            }

            req.user = tokenFromDB.user;

            next();
        } catch (e) {
            next(e);
        }
    }
};

module.exports = authMiddleware;

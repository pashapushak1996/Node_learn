const { authService } = require('../services');
const { statusCodesEnum, middlewareParamEnum } = require('../constants');
const { OAuth } = require('../dataBase');
const { ErrorHandler, errorMessages } = require('../error');
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

    checkAccessToken: async (req, res, next) => {
        try {
            const access_token = req.get(middlewareParamEnum.AUTHORIZATION);

            if (!access_token) {
                throw new ErrorHandler(statusCodesEnum.UNAUTHORIZED, errorMessages.NO_TOKEN);
            }

            await authService.verifyToken(access_token);

            const tokenFromDB = await OAuth.findOne({ access_token }).populate('user');

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

            await authService.verifyToken(refresh_token, 'refresh');

            const tokenFromDB = await OAuth.findOne({ refresh_token }).populate('user');

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

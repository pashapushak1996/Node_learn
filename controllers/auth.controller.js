const { middlewareParamEnum, statusCodesEnum } = require('../constants');
const { OAuth } = require('../dataBase');
const { passwordService, authService } = require('../services');
const { userDataNormalizator } = require('../utils');

const authController = {
    login: async (req, res, next) => {
        try {
            const { body: { password }, currentUser } = req;

            await passwordService.comparePassword(password, currentUser.password);

            const tokenPair = authService.generateTokenPair();

            await OAuth.create({ ...tokenPair, user: currentUser._id });

            res.status(statusCodesEnum.CREATED).json({ ...tokenPair, user: userDataNormalizator(currentUser) });
        } catch (e) {
            next(e);
        }
    },

    logout: async (req, res, next) => {
        try {
            const access_token = req.get(middlewareParamEnum.AUTHORIZATION);

            await OAuth.deleteOne({ access_token });

            res.status(statusCodesEnum.NO_CONTENT);
        } catch (e) {
            next(e);
        }
    },

    refresh: async (req, res, next) => {
        try {
            const user = req.loggedUser;
            const refresh_token = req.get(middlewareParamEnum.AUTHORIZATION);

            await OAuth.deleteOne({ refresh_token });

            const tokenPair = authService.generateTokenPair();

            await OAuth.create({ ...tokenPair, user: user._id });

            res.json({ ...tokenPair, user });
        } catch (e) {
            next(e);
        }
    },
};

module.exports = authController;

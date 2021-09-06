const { statusCodeEnum, middlewareParamEnum } = require('../constant');
const { dbModels } = require('../dataBase');
const { passwordService, jwtService } = require('../service');
const { userUtil } = require('../util');

const authController = {
    login: async (req, res, next) => {
        try {
            const { user, body: { password } } = req;

            await passwordService.comparePassword(password, user.password);

            const tokenPair = await jwtService.generateTokenPair();

            await dbModels.OAuth.create({ ...tokenPair, user: user._id });

            res
                .status(statusCodeEnum.CREATED)
                .json({ ...tokenPair, user: userUtil.dataNormalizator(user) });
        } catch (e) {
            next(e);
        }
    },

    logout: async (req, res, next) => {
        try {
            const access_token = req.get(middlewareParamEnum.AUTHORIZATION);

            await dbModels.OAuth.deleteOne({ access_token });

            res.sendStatus(statusCodeEnum.NO_CONTENT);
        } catch (e) {
            next(e);
        }
    },

    refresh: async (req, res, next) => {
        try {
            const refresh_token = req.get(middlewareParamEnum.AUTHORIZATION);
            const { loggedUser } = req;

            await dbModels.OAuth.deleteOne({ refresh_token });

            const tokenPair = await jwtService.generateTokenPair();

            await dbModels.OAuth.create({ ...tokenPair, user: loggedUser._id });

            res.sendStatus(statusCodeEnum.CREATED);
        } catch (e) {
            next(e);
        }
    }
};

module.exports = authController;

const { statusCodeEnum, middlewareParamEnum, emailTemplatesEnum } = require('../constant');
const { dbModels } = require('../dataBase');
const { passwordService, jwtService, emailService } = require('../service');
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
    },

    forgot: async (req, res, next) => {
        try {
            const { email, _id } = req.user;
            const { action_token } = jwtService.generateActionToken();

            await dbModels.ActionToken.create({ action_token, user: _id });

            await emailService.sendMessage(email, emailTemplatesEnum.FORGOT_PASSWORD, { action_token });

            res.status(200).json(action_token);
        } catch (e) {
            next(e);
        }
    },

    reset: async (req, res, next) => {
        try {
            const { password, user: { _id, email, name } } = req;

            const action_token = req.get(middlewareParamEnum.AUTHORIZATION);

            await dbModels.ActionToken.deleteOne({ action_token });

            const hashPassword = await passwordService.hashPassword(password);

            await dbModels.User.updateOne({ _id }, { $set: { password: hashPassword } });

            await emailService.sendMessage(email, [
                emailTemplatesEnum.CHANGE_PASSWORD,
                { userName: name }
            ]);

            res
                .status(statusCodeEnum.CREATED)
                .json('Password was changed');
        } catch (e) {
            next(e);
        }
    },
};

module.exports = authController;

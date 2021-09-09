const {
    statusCodeEnum,
    middlewareParamEnum,
    responseMessagesEnum,
    emailTemplatesEnum,
    tokenTypesEnum
} = require('../constant');
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

            await emailService.sendMessage(user.email, emailTemplatesEnum.USER_IS_LOGGED, { userName: user.name });

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
            const { email, _id, name: userName } = req.user;
            const { action_token } = jwtService.generateActionToken(tokenTypesEnum.FORGET_PASS);

            await dbModels.ActionToken.create({ action_token, user: _id });

            await emailService.sendMessage(email, emailTemplatesEnum.FORGOT_PASSWORD, { action_token, userName });

            res.sendStatus(statusCodeEnum.CREATED);
        } catch (e) {
            next(e);
        }
    },

    reset: async (req, res, next) => {
        try {
            const {
                body: { password },
                user: { _id, email, name }
            } = req;

            const action_token = req.get(middlewareParamEnum.AUTHORIZATION);

            await dbModels.ActionToken.deleteOne({ action_token });

            const hashPassword = await passwordService.hashPassword(password);

            await dbModels.User.updateOne({ _id }, { $set: { password: hashPassword } });

            await dbModels.OAuth.deleteMany({ user: _id });

            await emailService.sendMessage(email, [
                emailTemplatesEnum.CHANGE_PASSWORD,
                { userName: name }
            ]);

            res
                .status(statusCodeEnum.CREATED)
                .json(responseMessagesEnum.PASS_WAS_CHANGED);
        } catch (e) {
            next(e);
        }
    },

    activateUser: async (req, res, next) => {
        try {
            const { _id, email, name } = req.user;

            await dbModels.ActionToken.deleteOne({ user: _id });

            await dbModels.User.findOneAndUpdate({ _id }, { isActivated: true });

            await emailService.sendMessage(
                email,
                emailTemplatesEnum.ACCOUNT_ACTIVATED,
                { userName: name }
            );

            res
                .status(statusCodeEnum.CREATED);
        } catch (e) {
            next(e);
        }
    },

    changePassword: async (req, res, next) => {
        try {
            const {
                body: { newPassword },
                loggedUser: { name, email, _id }
            } = req;

            const hashPassword = await passwordService.hashPassword(newPassword);

            await dbModels.User.findOneAndUpdate({ _id }, { password: hashPassword });

            await emailService.sendMessage(
                email,
                emailTemplatesEnum.CHANGE_PASSWORD,
                { userName: name }
            );

            res
                .status(statusCodeEnum.CREATED);
        } catch (e) {
            next(e);
        }
    }
};

module.exports = authController;

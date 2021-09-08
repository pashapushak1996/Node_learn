const { statusCodeEnum, emailTemplatesEnum, userRolesEnum } = require('../constant');
const { dbModels: { User } } = require('../dataBase');
const { emailService, passwordService } = require('../service');
const { userUtil } = require('../util');

const userController = {
    getUsers: async (req, res, next) => {
        try {
            const users = await User.find(req.query);

            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    getSingleUser: (req, res, next) => {
        try {
            res.json(req.user);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const { password } = req.body;

            const hashPassword = await passwordService.hashPassword(password);

            const user = await User.create({ ...req.body, password: hashPassword });

            const normalizedUser = userUtil.dataNormalizator(user.toJSON());

            await emailService.sendMessage(
                normalizedUser.email,
                emailTemplatesEnum.ACCOUNT_CREATED,
                { userName: normalizedUser.name }
            );

            res
                .status(statusCodeEnum.CREATED)
                .json(normalizedUser);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const { _id, email } = req.user;

            const user = await User.findByIdAndUpdate({ _id }, req.body, {
                new: true
            });

            await emailService.sendMessage(
                email,
                emailTemplatesEnum.ACCOUNT_UPDATED,
                { userName: user.name }
            );

            const normalizedUser = userUtil.dataNormalizator(user);

            res.json(normalizedUser);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const {
                _id,
                role,
                name: userName,
                email
            } = req.user;

            await User.findOneAndDelete({ _id });

            const isAdmin = role === userRolesEnum.ADMIN;

            if (isAdmin) {
                await emailService.sendMessage(
                    email,
                    emailTemplatesEnum.DELETE_ACCOUNT_ADMIN,
                    { userName }
                );
            } else {
                await emailService.sendMessage(
                    email,
                    emailTemplatesEnum.DELETE_ACCOUNT_USER,
                    { userName }
                );
            }

            res.sendStatus(statusCodeEnum.NO_CONTENT);
        } catch (e) {
            next(e);
        }
    }
};

module.exports = userController;

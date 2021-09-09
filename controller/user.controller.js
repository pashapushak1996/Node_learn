const {
    statusCodeEnum,
    emailTemplatesEnum,
    userRolesEnum,
    tokenTypesEnum
} = require('../constant');
const { dbModels } = require('../dataBase');
const { emailService, passwordService, jwtService } = require('../service');
const { userUtil } = require('../util');

const userController = {
    getUsers: async (req, res, next) => {
        try {
            const users = await dbModels.User.find(req.query);

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

            const user = await dbModels.User.create({ ...req.body, password: hashPassword });

            const activate_token = await jwtService.generateActionToken(tokenTypesEnum.ACTIVATE_ACC);

            const normalizedUser = userUtil.dataNormalizator(user.toJSON());

            await emailService.sendMessage(
                normalizedUser.email,
                emailTemplatesEnum.ACCOUNT_CREATED,
                { userName: normalizedUser.name, activate_token }
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

            const user = await dbModels.User.findByIdAndUpdate({ _id }, req.body, {
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
                user: {
                    name: userName,
                    email,
                    _id
                },
                loggedUser: {
                    role
                },
            } = req;

            await dbModels.User.findOneAndDelete({ _id });

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

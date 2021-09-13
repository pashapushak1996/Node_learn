const {
    statusCodeEnum,
    emailTemplatesEnum,
    userRolesEnum,
    tokenTypesEnum
} = require('../constant');
const { dbModels } = require('../dataBase');
const {
    emailService,
    passwordService,
    jwtService,
    s3Service
} = require('../service');
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

            let createdUser = await dbModels.User.create({ ...req.body, password: hashPassword });

            if (req.files && req.files.avatar) {
                const { _id } = createdUser;

                const s3Response = await s3Service.uploadFile(
                    req.files.avatar,
                    'users',
                    _id.toString()
                );

                createdUser = await dbModels.User.findByIdAndUpdate(
                    { _id },
                    { avatar: s3Response.Location },
                    { new: true }
                );
            }

            const { action_token } = await jwtService.generateActionToken(tokenTypesEnum.ACTIVATE_ACC);

            await dbModels.ActionToken.create({ action_token, user: createdUser._id });

            const normalizedUser = userUtil.dataNormalizator(createdUser.toJSON());

            await emailService.sendMessage(
                normalizedUser.email,
                emailTemplatesEnum.ACCOUNT_CREATED,
                { userName: normalizedUser.name, activate_token: action_token }
            );

            res
                .status(statusCodeEnum.CREATED)
                .json({ createdUser, action_token });
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const { loggedUser: { _id, email }, baseUrl } = req;

            const usersString = baseUrl.split('/').pop();

            let updatedUser = await dbModels.User.findByIdAndUpdate({ _id }, req.body, {
                new: true
            });

            if (req.files && req.files.avatar) {
                if (updatedUser.avatar) {
                    await s3Service.deleteFile(updatedUser.avatar);
                }

                const s3Response = await s3Service.uploadFile(
                    req.files.avatar,
                    usersString,
                    _id.toString()
                );

                updatedUser = await dbModels.User.findByIdAndUpdate(
                    { _id },
                    { avatar: s3Response.Location },
                    { new: true }
                );
            }

            await emailService.sendMessage(
                email,
                emailTemplatesEnum.ACCOUNT_UPDATED,
                { userName: updatedUser.name }
            );

            const normalizedUser = userUtil.dataNormalizator(updatedUser);

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

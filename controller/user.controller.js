const {
    fileProperties: {
        itemTypes
    },
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
    s3Service,
    userService
} = require('../service');
const { userUtil } = require('../util');

const userController = {
    getUsers: async (req, res, next) => {
        try {
            const users = await userService.getAllUsers(req.query);

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
                    itemTypes.users,
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
            const { _id, email } = req.user;

            let updatedUser = await dbModels.User.findByIdAndUpdate({ _id }, req.body, {
                new: true
            });

            if (req.files && req.files.avatar) {
                if (updatedUser.avatar) {
                    await s3Service.deleteFile(updatedUser.avatar);
                }

                const s3Response = await s3Service.uploadFile(
                    req.files.avatar,
                    itemTypes.users,
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
                user,
                loggedUser: {
                    role
                },
            } = req;

            if (user.avatar) {
                await s3Service.deleteFile(user.avatar);
            }

            await dbModels.User.findOneAndDelete({ _id: user });

            const isAdmin = role === userRolesEnum.ADMIN;

            if (isAdmin) {
                await emailService.sendMessage(
                    user.email,
                    emailTemplatesEnum.DELETE_ACCOUNT_ADMIN,
                    { userName: user.name }
                );
            } else {
                await emailService.sendMessage(
                    user.email,
                    emailTemplatesEnum.DELETE_ACCOUNT_USER,
                    { userName: user.name }
                );
            }

            res.sendStatus(statusCodeEnum.NO_CONTENT);
        } catch (e) {
            next(e);
        }
    }
};

module.exports = userController;

const userService = require('../services/user.service');

const statusCodes = require('../config/statusCodes');

const userController = {
    getUsers: async (req, res, next) => {
        try {
            const users = await userService.getAllUsers();

            res
                .status(statusCodes.OK)
                .json(users);
        } catch (e) {
            next(e);
        }
    },

    getUserById: (req, res, next) => {
        try {
            const { currentUser } = req;

            res
                .status(statusCodes.OK)
                .json(currentUser);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const createdUser = await userService.createUser(req.body);

            res
                .status(statusCodes.CREATED)
                .json(createdUser);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const { userId } = req.params;
            await userService.deleteUser(userId);

            res
                .status(statusCodes.NO_CONTENT)
                .json(`User ${userId} is deleted`);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const { userId } = req.params;
            const updatedUser = await userService.updateUser(userId, req);

            res
                .status(statusCodes.OK)
                .json(updatedUser);
        } catch (e) {
            next(e);
        }
    },
};

module.exports = userController;

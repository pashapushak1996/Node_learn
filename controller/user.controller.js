const { statusCodeEnum } = require('../constant');
const { dbModels: { User } } = require('../dataBase');
const { passwordService } = require('../service');
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

            const hashPassword = passwordService.hashPassword(password);

            const user = await User.create({ ...req.body, password: hashPassword });

            const normalizedUser = userUtil.dataNormalizator(user);

            res
                .status(statusCodeEnum.CREATED)
                .json(normalizedUser);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const { user: { _id } } = req;

            const user = await User.findByIdAndUpdate({ _id }, req.body, {
                new: true
            });

            const normalizedUser = userUtil.dataNormalizator(user);

            res.json(normalizedUser);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const { user: { _id } } = req;

            await User.findOneAndDelete({ _id });

            res.sendStatus(statusCodeEnum.NO_CONTENT);
        } catch (e) {
            next(e);
        }
    }
};

module.exports = userController;

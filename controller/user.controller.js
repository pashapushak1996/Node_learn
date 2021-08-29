const { userDataNormalizator } = require('../util/userDataNormalizator');
const { userRegEx } = require('../constants/regEx');
const { statusCodesEnum } = require('../constants/enum');
const { User } = require('../dataBase');
const { passwordService } = require('../service');

const userController = {
    getAllUsers: async (req, res, next) => {
        try {
            const { email } = req.query;

            const isTrueEmail = userRegEx.EMAIL_REGEX.test(email);

            if (isTrueEmail) {
                const user = await User.findOne({ email }).select('-__v');
                res.json(user);
                return;
            }

            const users = await User.find().select('-__v');

            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    getUserById: (req, res, next) => {
        try {
            const { currentUser } = req;

            const normalizedUser = userDataNormalizator(currentUser);

            res.json(normalizedUser);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const { password } = req.body;

            const hashPassword = await passwordService.hashPassword(password);

            let user = await User.create({ ...req.body, password: hashPassword });

            user = user.toJSON();

            const normalizedUser = userDataNormalizator(user);

            res.status(statusCodesEnum.CREATED).json(normalizedUser);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const { user_id } = req.params;

            await User.findByIdAndDelete({ _id: user_id });

            res.status(statusCodesEnum.NO_CONTENT);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const { user_id } = req.params;

            const updatedUser = await User.findByIdAndUpdate({ _id: user_id }, { ...req.body }, { new: true }).lean();

            const normalizedUser = userDataNormalizator(updatedUser);

            res.json(normalizedUser);
        } catch (e) {
            next(e);
        }
    }
};

module.exports = userController;

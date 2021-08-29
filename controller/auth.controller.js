const { ErrorHandler, errorMessages } = require('../error');
const { User } = require('../dataBase');
const { passwordService } = require('../service');
const { statusCodesEnum } = require('../config');

const authController = {
    login: async (req, res, next) => {
        try {
            const { password, email } = req.body;

            const currentUser = await User.findOne({ email });

            const isTrueEmail = email === currentUser.email;

            await passwordService.comparePassword(password, currentUser.password);

            if (!isTrueEmail) {
                throw new ErrorHandler(statusCodesEnum.NOT_FOUND, errorMessages.NOT_FOUND_USER);
            }

            res.json('User logged');
        } catch (e) {
            next(e);
        }
    }
};

module.exports = authController;

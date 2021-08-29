const { ErrorHandler, errorMessages } = require('../error');
const { passwordService } = require('../service');
const { statusCodesEnum } = require('../config');

const authController = {
    login: async (req, res, next) => {
        try {
            const { body: { password, email }, currentUser } = req;

            const isTrueEmail = email === currentUser.email;

            if (!isTrueEmail) {
                throw new ErrorHandler(statusCodesEnum.NOT_FOUND, errorMessages.NOT_FOUND_USER);
            }

            await passwordService.comparePassword(password, currentUser.password);

            res.json('User logged');
        } catch (e) {
            next(e);
        }
    }
};

module.exports = authController;

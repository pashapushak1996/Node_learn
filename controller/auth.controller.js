const { ErrorHandler, errorMessages } = require('../error');
const { passwordService } = require('../service');
const { statusCodesEnum } = require('../constants/enum');

const authController = {
    login: async (req, res, next) => {
        try {
            const { body: { password, email }, currentUser } = req;

            const isTrueEmail = email === currentUser.email;

            if (!isTrueEmail) {
                throw new ErrorHandler(statusCodesEnum.NOT_FOUND, errorMessages.NOT_FOUND_USER);
            }

            await passwordService.comparePassword(password, currentUser.password);

            res.redirect(`/users?email=${currentUser.email}`);
        } catch (e) {
            next(e);
        }
    }
};

module.exports = authController;

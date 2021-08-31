const { passwordService } = require('../services');

const authController = {
    login: async (req, res, next) => {
        try {
            const { body: { password }, currentUser } = req;

            await passwordService.comparePassword(password, currentUser.password);

            res.redirect(`/users?email=${currentUser.email}`);
        } catch (e) {
            next(e);
        }
    }
};

module.exports = authController;

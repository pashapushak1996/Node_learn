const { tokenTypesEnum, emailTemplatesEnum, statusCodeEnum } = require('../constant');
const { jwtService, emailService } = require('../service');
const { dbModels } = require('../dataBase');

const adminController = {
    createUserAdmin: async (req, res, next) => {
        try {
            const { admin, body: { email, name } } = req;

            const password = _getRandomPassword(8);

            await dbModels.User.create({ name, email, password });

            const { action_token } = jwtService.generateActionToken(tokenTypesEnum.ACTIVATE_ACC);

            await emailService.sendMessage(email, emailTemplatesEnum.ACCOUNT_CREATED, {
                adminName: admin.name,
                userName: name,
                activate_token: action_token
            });

            res
                .status(statusCodeEnum.CREATED)
                .json('User created by admin');
        } catch (e) {
            next(e);
        }
    }
};

module.exports = adminController;

function _getRandomPassword(stringLength) {
    let pass = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-)(;.,:%№"!абвгдеёжзийклмнопрс';
    for (let i = 0; i < stringLength; i++) {
        pass += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return pass;
}

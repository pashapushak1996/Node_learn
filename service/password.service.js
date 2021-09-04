const bcrypt = require('bcrypt');
const { variables } = require('../config');
const { statusCodeEnum } = require('../constant');
const { ErrorHandler, errorMessageEnum } = require('../error');

module.exports = {
    hashPassword: (password) => bcrypt.hash(password, variables.SALT),
    comparePassword: async (password, hashPassword) => {
        const isPasswordMatched = await bcrypt.compare(password, hashPassword);

        if (!isPasswordMatched) {
            throw new ErrorHandler(statusCodeEnum.BAD_REQUEST, errorMessageEnum.EMAIL_OR_PASSWORD_ERR);
        }
    }
};

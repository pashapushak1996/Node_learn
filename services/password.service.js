const bcrypt = require('bcrypt');

const { ErrorHandler, errorMessages } = require('../error');
const { statusCodesEnum } = require('../constants');

module.exports = {
    hashPassword: (password) => bcrypt.hash(password, 10),
    comparePassword: async (password, hash) => {
        const isPasswordMatched = await bcrypt.compare(password, hash);

        if (!isPasswordMatched) {
            throw new ErrorHandler(statusCodesEnum.UNAUTHORIZED, errorMessages.WRONG_EMAIL_OR_PASSWORD);
        }

        return true;
    }
};
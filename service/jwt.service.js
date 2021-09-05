const jwt = require('jsonwebtoken');

const { promisify } = require('util');

const { variables: { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } } = require('../config');
const { statusCodeEnum } = require('../constant');
const { ErrorHandler, errorMessageEnum } = require('../error');

const verifyTokenPromisify = promisify(jwt.verify);

module.exports = {
    generateTokenPair: () => {
        const access_token = jwt.sign({}, ACCESS_SECRET_KEY, { expiresIn: '15m' });
        const refresh_token = jwt.sign({}, REFRESH_SECRET_KEY, { expiresIn: '31d' });

        return {
            access_token,
            refresh_token
        };
    },

    verifyToken: async (token, tokenType = 'access') => {
        try {
            const secretKey = tokenType === 'access' ? ACCESS_SECRET_KEY : REFRESH_SECRET_KEY;

            await verifyTokenPromisify(token, secretKey);
        } catch (e) {
            throw new ErrorHandler(statusCodeEnum.FORBIDDEN, errorMessageEnum.WRONG_TOKEN);
        }
    }
};

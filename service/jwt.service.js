const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const { ErrorHandler, errorMessageEnum } = require('../error');
const { statusCodeEnum } = require('../constant');

const { variables: { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } } = require('../config');

const verifyTokenPromisify = promisify(jwt.verify);

const jwtService = {
    generateTokenPair: () => {
        const access_token = jwt.sign({}, ACCESS_SECRET_KEY, { expiresIn: '15m' });
        const refresh_token = jwt.sign({}, ACCESS_SECRET_KEY, { expiresIn: '31d' });

        return {
            access_token,
            refresh_token
        };
    },

    verifyToken: async (token, tokenType = 'access') => {
        try {
            const secretWord = tokenType === 'access' ? ACCESS_SECRET_KEY : REFRESH_SECRET_KEY;

            await verifyTokenPromisify(token, secretWord);
        } catch (e) {
            throw new ErrorHandler(statusCodeEnum.FORBIDDEN, errorMessageEnum.WRONG_TOKEN);
        }
    }
};

module.exports = jwtService;

const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const { ErrorHandler, errorMessageEnum } = require('../error');
const { statusCodeEnum } = require('../constant');

const {
    variables: {
        ACCESS_SECRET_KEY,
        REFRESH_SECRET_KEY,
        ACTION_SECRET_KEY
    }
} = require('../config');

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

    generateActionToken: () => {
        const action_token = jwt.sign({}, ACTION_SECRET_KEY, { expiresIn: '5m' });

        return { action_token };
    },

    verifyToken: async (token, tokenType = 'access') => {
        try {
            let secretWord;

            switch (tokenType) {
                case 'access':
                    secretWord = ACCESS_SECRET_KEY;
                    break;
                case 'refresh':
                    secretWord = REFRESH_SECRET_KEY;
                    break;
                case 'action':
                    secretWord = ACTION_SECRET_KEY;
                    break;
                default:
                    break;
            }

            await verifyTokenPromisify(token, secretWord);
        } catch (e) {
            throw new ErrorHandler(statusCodeEnum.FORBIDDEN, errorMessageEnum.WRONG_TOKEN);
        }
    }
};

module.exports = jwtService;

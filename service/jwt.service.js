const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const { ErrorHandler, errorMessageEnum } = require('../error');
const { statusCodeEnum, tokenTypesEnum } = require('../constant');

const {
    variables: {
        JWT_KEYS
    }
} = require('../config');

const verifyTokenPromisify = promisify(jwt.verify);

const jwtService = {
    generateTokenPair: () => {
        const access_token = jwt.sign({}, JWT_KEYS.ACCESS_SECRET_KEY, { expiresIn: '15m' });
        const refresh_token = jwt.sign({}, JWT_KEYS.REFRESH_SECRET_KEY, { expiresIn: '31d' });

        return {
            access_token,
            refresh_token
        };
    },

    verifyToken: async (token, tokenType = tokenTypesEnum.ACCESS) => {
        try {
            const secretWord = tokenType === tokenTypesEnum.ACCESS
                ? JWT_KEYS.ACCESS_SECRET_KEY
                : JWT_KEYS.REFRESH_SECRET_KEY;

            await verifyTokenPromisify(token, secretWord);
        } catch (e) {
            throw new ErrorHandler(statusCodeEnum.FORBIDDEN, errorMessageEnum.WRONG_TOKEN);
        }
    },

    generateActionToken: (tokenType) => {
        const secretWord = _getSecretWord(tokenType);

        const action_token = jwt.sign({}, secretWord, { expiresIn: '10d' });

        return { action_token };
    },

    verifyActionToken: async (token, tokenType) => {
        try {
            const secretWord = _getSecretWord(tokenType);

            await verifyTokenPromisify(token, secretWord);
        } catch (e) {
            throw new ErrorHandler(statusCodeEnum.FORBIDDEN, errorMessageEnum.WRONG_TOKEN);
        }
    }
};

function _getSecretWord(tokenType) {
    let secretWord = '';

    switch (tokenType) {
        case tokenTypesEnum.FORGOT_PASS:
            secretWord = JWT_KEYS.FORGET_PASS_SECRET_KEY;
            break;
        case tokenTypesEnum.ACTIVATE_ACC:
            secretWord = JWT_KEYS.ACTIVATE_ACC_SECRET_KEY;
            break;
        default:
            throw new ErrorHandler(statusCodeEnum.SERVER_ERROR, errorMessageEnum.INTERNAL_SERVER_ERROR);
    }

    return secretWord;
}

module.exports = jwtService;

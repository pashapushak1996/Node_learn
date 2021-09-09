const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const { ErrorHandler, errorMessageEnum } = require('../error');
const { statusCodeEnum, tokenTypesEnum } = require('../constant');

const {
    variables: {
        ACCESS_SECRET_KEY,
        REFRESH_SECRET_KEY,
        FORGET_PASS_SECRET_KEY,
        ACTIVATE_ACC_SECRET_KEY
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

    verifyToken: async (token, tokenType = tokenTypesEnum.ACCESS) => {
        try {
            const secretWord = tokenType === tokenTypesEnum.ACCESS
                ? ACCESS_SECRET_KEY
                : REFRESH_SECRET_KEY;

            await verifyTokenPromisify(token, secretWord);
        } catch (e) {
            throw new ErrorHandler(statusCodeEnum.FORBIDDEN, errorMessageEnum.WRONG_TOKEN);
        }
    },

    generateActionToken: (tokenType) => {
        const secretWord = _getSecretWord(tokenType);

        const action_token = jwt.sign({}, secretWord, { expiresIn: '5m' });

        return { action_token };
    },

    verifyActionToken: async (token, tokenType) => {
        const secretWord = _getSecretWord(tokenType);

        await verifyTokenPromisify(token, secretWord);
    }
};

function _getSecretWord(tokenType) {
    let secretWord = '';

    switch (tokenType) {
        case tokenTypesEnum.FORGET_PASS:
            secretWord = FORGET_PASS_SECRET_KEY;
            break;
        case tokenTypesEnum.ACTIVATE_ACC:
            secretWord = ACTIVATE_ACC_SECRET_KEY;
            break;
        default:
            throw new ErrorHandler(statusCodeEnum.SERVER_ERROR, errorMessageEnum.INTERNAL_SERVER_ERROR);
    }

    return secretWord;
}

module.exports = jwtService;

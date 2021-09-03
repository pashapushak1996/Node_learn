const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const { middlewareParamEnum } = require('../constants');

const {
    variables: {
        ACCESS_SECRET_KEY,
        REFRESH_SECRET_KEY
    }
} = require('../config');
const { statusCodesEnum } = require('../constants');
const { errorMessages, ErrorHandler } = require('../error');

const promisifyVerifyToken = promisify(jwt.verify);

const generateTokenPair = () => {
    const access_token = jwt.sign({}, ACCESS_SECRET_KEY, { expiresIn: '15m' });
    const refresh_token = jwt.sign({}, REFRESH_SECRET_KEY, { expiresIn: '31d' });

    return {
        access_token,
        refresh_token
    };
};

const verifyToken = async (token, tokenType = middlewareParamEnum.ACCESS) => {
    try {
        const secretWord = tokenType === middlewareParamEnum.ACCESS ? ACCESS_SECRET_KEY : REFRESH_SECRET_KEY;

        await promisifyVerifyToken(token, secretWord);
    } catch (e) {
        throw new ErrorHandler(statusCodesEnum.UNAUTHORIZED, errorMessages.WRONG_TOKEN);
    }
};

module.exports = {
    generateTokenPair,
    verifyToken
};

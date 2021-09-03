const router = require('express').Router();

const { authController } = require('../controllers');
const { middlewareParamEnum } = require('../constants');
const { authMiddleware, userMiddleware, globalMiddleware } = require('../middlewares');
const { authValidator } = require('../validators');

router.post('/',
    globalMiddleware.dynamicValidatorMiddleware(authValidator.loginDataValidator),
    userMiddleware.getUserByDynamicParams(middlewareParamEnum.EMAIL),
    userMiddleware.throwIfUserNotExist,
    authController.login);

router.post('/logout',
    authMiddleware.checkAccessToken,
    authController.logout);

router.post('/refresh',
    authMiddleware.checkRefreshToken,
    authController.refresh);

module.exports = router;

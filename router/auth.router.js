const router = require('express').Router();

const { authController } = require('../controller');
const { middlewareParamEnum, tokenTypesEnum } = require('../constant');
const { authMiddleware, generalMiddleware, userMiddleware } = require('../middleware');
const { authValidator } = require('../validators');

router.post('/',
    generalMiddleware.dynamicValidator(authValidator.checkAuthData),
    userMiddleware.getUserByDynamicParam(middlewareParamEnum.EMAIL),
    userMiddleware.throwIfUserNotExist,
    userMiddleware.throwIfUserNotActive,
    authController.login);

router.post('/logout',
    authMiddleware.checkAccessToken,
    authController.logout);

router.post('/refresh',
    authMiddleware.checkRefreshToken,
    authController.refresh);

router.post('/password/forgot',
    generalMiddleware.dynamicValidator(authValidator.checkMail),
    userMiddleware.getUserByDynamicParam(middlewareParamEnum.EMAIL),
    userMiddleware.throwIfUserNotExist,
    authController.forgot);

router.post('/password/reset',
    generalMiddleware.dynamicValidator(authValidator.checkPass),
    authMiddleware.checkActionToken(tokenTypesEnum.ACTIVATE_ACC),
    authController.reset);

router.patch('/password/reset',
    generalMiddleware.dynamicValidator(authValidator.checkPass),
    authMiddleware.checkActionToken(tokenTypesEnum.FORGOT_PASS),
    authController.reset);

router.post('/password/change',
    generalMiddleware.dynamicValidator(authValidator.checkChangePassData),
    authMiddleware.checkAccessToken,
    authMiddleware.checkOldPassword,
    authController.changePassword);

router.post('/activate',
    authMiddleware.checkActionToken(tokenTypesEnum.ACTIVATE_ACC),
    authController.activateUser);

module.exports = router;

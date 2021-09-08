const router = require('express').Router();

const { authController } = require('../controller');
const { middlewareParamEnum: { EMAIL } } = require('../constant');
const { authMiddleware, generalMiddleware, userMiddleware } = require('../middleware');
const { authValidator } = require('../validators');

router.post('/',
    generalMiddleware.dynamicValidator(authValidator.checkAuthData),
    userMiddleware.getUserByDynamicParam(EMAIL),
    authController.login);

router.post('/logout',
    authMiddleware.checkAccessToken,
    authController.logout);

router.post('/refresh',
    authMiddleware.checkRefreshToken,
    authController.refresh);

router.post('/password/forgot',
    userMiddleware.getUserByDynamicParam(EMAIL),
    authController.forgot);

router.post('/password/reset/',
    generalMiddleware.dynamicValidator(authValidator.checkPass),
    authMiddleware.checkActionToken,
    authController.reset);

module.exports = router;

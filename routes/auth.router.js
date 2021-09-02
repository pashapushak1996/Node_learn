const router = require('express').Router();

const { authController } = require('../controllers');
const { authMiddleware, userMiddleware } = require('../middlewares');

router.post('/',
    authMiddleware.checkLoginUserData,
    userMiddleware.getUserByDynamicParams('email'),
    userMiddleware.throwIfUserNotExist,
    authController.login);

router.post('/logout',
    authMiddleware.checkAccessToken,
    authController.logout);

router.post('/refresh',
    authMiddleware.checkRefreshToken,
    authController.refresh);

module.exports = router;

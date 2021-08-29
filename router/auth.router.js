const router = require('express').Router();

const { authController } = require('../controller');
const { authMiddleware } = require('../middleware');

router.post('/',
    authMiddleware.checkLoginUserData,
    authMiddleware.isEmailExist,
    authController.login);

module.exports = router;

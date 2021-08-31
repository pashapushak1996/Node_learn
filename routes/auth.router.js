const router = require('express').Router();

const { authController } = require('../controllers');
const { authMiddleware } = require('../middlewares');

router.post('/',
    authMiddleware.checkLoginUserData,
    authMiddleware.isEmailExist,
    authController.login);

module.exports = router;

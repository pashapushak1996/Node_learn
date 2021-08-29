const router = require('express').Router();

const { authController } = require('../controller');
const { authMiddleware, userMiddleware } = require('../middleware');

router.post('/', authMiddleware.checkLoginUserData, userMiddleware.isUserPresent, authController.login);

module.exports = router;

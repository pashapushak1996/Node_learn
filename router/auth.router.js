const router = require('express').Router();

const { authController } = require('../controller');

router.post('/', authController.login);

router.post('/logout', authController.logout);

router.post('/refresh', authController.refresh);

module.exports = router;

const router = require('express').Router();

const authController = require('../controller/auth.controller');

router.get('/', authController.showAuthPage);

router.post('/', authController.login);

module.exports = router;

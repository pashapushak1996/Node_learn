const router = require('express').Router();

const { authController } = require('../controllers');

router.post('/', authController.login);

router.get('/register', authController.register);

module.exports = router;

const router = require('express').Router();

const { authController } = require('../controllers');

router.post('/', authController.login);

module.exports = router;

const router = require('express').Router();
const { usersController } = require('../controllers');

router.get(`/`, usersController.getUsers);

router.post(`/`, usersController.createUser);

router.delete(`/:user_id`, usersController.deleteUser);

module.exports = router;
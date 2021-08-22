const router = require('express').Router();
const { userController } = require('../controllers');

router.get('/', userController.getAllUsers);

router.post('/', userController.createUser);

router.get('/:user_id', userController.getUserById);

router.delete('/:user_id', userController.deleteUser);

router.put('/:user_id', userController.updateUser);

module.exports = router;

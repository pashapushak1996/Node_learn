const router = require('express').Router();

const userController = require('../controller/user.controller');

router.get('/', userController.getAllUsers);

router.post('/', userController.createUser);

router.get('/:userId', userController.getUserById);

router.delete('/:userId', () => {

});

router.put('/:userId', () => {

});

module.exports = router;

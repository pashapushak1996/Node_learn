const router = require('express').Router();

const { userController } = require('../controller');
const { userMiddleware } = require('../middleware');

router.get('/', userController.getAllUsers);

router.post('/',
    userMiddleware.checkCreateUserData,
    userMiddleware.checkUniqueEmail,
    userController.createUser);

router.put('/:user_id',
    userMiddleware.checkUpdateUserData,
    userMiddleware.isUserPresent,
    userController.updateUser);

router.get('/:user_id', userMiddleware.isUserPresent, userController.getUserById);

router.delete('/:user_id', userMiddleware.isUserPresent, userController.deleteUser);

module.exports = router;

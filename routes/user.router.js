const router = require('express').Router();

const { userController } = require('../controllers');
const { userMiddleware } = require('../middlewares');

router.get('/', userController.getAllUsers);

router.post('/',
    userMiddleware.checkCreateUserData,
    userMiddleware.checkUniqueEmail,
    userController.createUser);

router.put('/:user_id',
    userMiddleware.checkUpdateUserData,
    userMiddleware.getUserByDynamicParams('email'),
    userController.updateUser);

router.get('/:user_id',
    userMiddleware.getUserByDynamicParams('user_id', 'params', '_id'), userController.getUserById);

router.delete('/:user_id',
    userMiddleware.getUserByDynamicParams('user_id', 'params', '_id'), userController.deleteUser);

module.exports = router;

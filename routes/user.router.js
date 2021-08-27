const router = require('express').Router();

const { userController } = require('../controllers');
const userMiddlewares = require('../middlewares/user.middleware');

router.get('/', userController.getUsers);

router.post('/',
    userMiddlewares.isValidEmail,
    userMiddlewares.checkUniqueEmail,
    userMiddlewares.isUserDataFill,
    userMiddlewares.checkPassword,
    userController.createUser);

router.get('/:userId', userMiddlewares.isUserPresent, userController.getUserById);

router.put('/:userId',
    userMiddlewares.isUserPresent,
    userMiddlewares.isUserDataFill,
    userMiddlewares.isValidEmail,
    userMiddlewares.checkPassword,
    userController.updateUser);

router.delete('/:userId', userMiddlewares.isUserPresent, userController.deleteUser);

module.exports = router;

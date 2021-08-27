const router = require('express').Router();

const { userController } = require('../controllers');
const userMiddlewares = require('../middlewares/user.middleware');

router.get('/', userController.getUsers);

router.post('/',
    userMiddlewares.isUserDataFill,
    userMiddlewares.checkPassword,
    userMiddlewares.isValidEmail,
    userMiddlewares.checkUniqueEmail,
    userController.createUser);

router.get('/:userId', userMiddlewares.isUserPresent, userController.getUserById);

router.put('/:userId',
    userMiddlewares.isUserDataFill,
    userMiddlewares.isValidEmail,
    userMiddlewares.checkPassword,
    userMiddlewares.isUserPresent,
    userController.updateUser);

router.delete('/:userId', userMiddlewares.isUserPresent, userController.deleteUser);

module.exports = router;

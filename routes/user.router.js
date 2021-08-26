const router = require('express').Router();

const { userController } = require('../controllers');
const userMiddlewares = require('../middlewares/user.middleware');

router.get('/', userController.getUsers);

router.post('/',
    userMiddlewares.isValidEmail,
    userMiddlewares.isUniqueEmail,
    userMiddlewares.isUserDataPresent,
    userMiddlewares.isPasswordPresent,
    userController.createUser);
router.get('/:userId', userMiddlewares.isUserPresent, userController.getUserById);

router.put('/:userId', userMiddlewares.isUserPresent, userController.updateUser);

router.delete('/:userId', userMiddlewares.isUserPresent, userController.deleteUser);

module.exports = router;

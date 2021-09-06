const router = require('express').Router();

const { middlewareParamEnum, userRolesEnum } = require('../constant');
const { userController } = require('../controller');
const { authMiddleware, userMiddleware, generalMiddleware } = require('../middleware');
const { userValidator } = require('../validators');

router.get('/',
    userController.getUsers);

router.post('/',
    generalMiddleware.dynamicValidator(userValidator.createUser),
    userMiddleware.getUserByDynamicParam(middlewareParamEnum.EMAIL),
    userMiddleware.throwIfUserExist,
    userController.createUser);

router.get('/:userId',
    userMiddleware.getUserByDynamicParam(
        middlewareParamEnum.USER_ID,
        middlewareParamEnum.PARAM,
        middlewareParamEnum.DB_ID
    ),
    userMiddleware.throwIfUserNotExist,
    userController.getSingleUser);

router.put('/:userId',
    generalMiddleware.dynamicValidator(userValidator.updateUser),
    authMiddleware.checkAccessToken,
    userMiddleware.getUserByDynamicParam(
        middlewareParamEnum.USER_ID,
        middlewareParamEnum.PARAM,
        middlewareParamEnum.DB_ID
    ),
    userMiddleware.throwIfUserNotExist,
    userMiddleware.checkIsLoggedUser,
    userController.updateUser);

router.delete('/:userId',
    authMiddleware.checkAccessToken,
    userMiddleware.getUserByDynamicParam(
        middlewareParamEnum.USER_ID,
        middlewareParamEnum.PARAM,
        middlewareParamEnum.DB_ID
    ),
    userMiddleware.throwIfUserNotExist,
    userMiddleware.checkUserRole([userRolesEnum.ADMIN]),
    userController.deleteUser);

module.exports = router;

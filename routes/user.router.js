const router = require('express').Router();

const { middlewareParamEnum, userRolesEnum } = require('../constants');
const { userController } = require('../controllers');
const { userMiddleware, authMiddleware } = require('../middlewares');

router.get('/', userController.getAllUsers);

router.post('/',
    userMiddleware.checkCreateUserData,
    userMiddleware.getUserByDynamicParams('email'),
    userMiddleware.throwIfUserExist,
    userController.createUser);

router.put('/:user_id',
    userMiddleware.checkUpdateUserData,
    authMiddleware.checkAccessToken,
    userMiddleware.getUserByDynamicParams(
        middlewareParamEnum.USER_ID,
        middlewareParamEnum.REQ_PARAMS,
        middlewareParamEnum.DB_ID
    ),
    userMiddleware.throwIfUserNotExist,
    userMiddleware.checkUserRole(),
    userController.updateUser);

router.get('/:user_id',
    userMiddleware.getUserByDynamicParams(
        middlewareParamEnum.USER_ID,
        middlewareParamEnum.REQ_PARAMS,
        middlewareParamEnum.DB_ID
    ),
    userMiddleware.throwIfUserNotExist,
    userController.getUserById);

router.delete('/:user_id',
    authMiddleware.checkAccessToken,
    userMiddleware.getUserByDynamicParams(
        middlewareParamEnum.USER_ID,
        middlewareParamEnum.REQ_PARAMS,
        middlewareParamEnum.DB_ID
    ),
    userMiddleware.checkUserRole([userRolesEnum.ADMIN]),
    userMiddleware.throwIfUserNotExist,
    userController.deleteUser);

module.exports = router;

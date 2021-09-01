const router = require('express').Router();

const { middlewareParamEnum } = require('../constants');
const { userController } = require('../controllers');
const { userMiddleware } = require('../middlewares');

router.get('/', userController.getAllUsers);

router.post('/',
    userMiddleware.checkCreateUserData,
    userMiddleware.checkUniqueEmail,
    userController.createUser);

router.put('/:user_id',
    userMiddleware.checkUpdateUserData,
    userMiddleware.getUserByDynamicParams(
        middlewareParamEnum.USER_ID,
        middlewareParamEnum.REQ_PARAMS,
        middlewareParamEnum.DB_ID
    ),
    userController.updateUser);

router.get('/:user_id',
    userMiddleware.getUserByDynamicParams(
        middlewareParamEnum.USER_ID,
        middlewareParamEnum.REQ_PARAMS,
        middlewareParamEnum.DB_ID
    ), userController.getUserById);

router.delete('/:user_id',
    userMiddleware.getUserByDynamicParams(
        middlewareParamEnum.USER_ID,
        middlewareParamEnum.REQ_PARAMS,
        middlewareParamEnum.DB_ID
    ), userController.deleteUser);

module.exports = router;

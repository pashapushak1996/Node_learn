const router = require('express').Router();

const { middlewareParamEnum } = require('../constant');

const { userController } = require('../controller');
const { userMiddleware, generalMiddleware } = require('../middleware');
const { userValidator } = require('../validators');

router.get('/',
    userController.getUsers);

router.post('/',
    generalMiddleware.dynamicValidator(userValidator.createUser),
    userMiddleware.throwIfUserExist,
    userController.createUser);

router.get('/:userId',
    userMiddleware.getUserByDynamicParam(
        middlewareParamEnum.USER_ID,
        middlewareParamEnum.PARAM,
        middlewareParamEnum.DB_ID
    ),
    userController.getSingleUser);

router.put('/:userId',
    generalMiddleware.dynamicValidator(userValidator.updateUser),
    userMiddleware.getUserByDynamicParam(
        middlewareParamEnum.USER_ID,
        middlewareParamEnum.PARAM,
        middlewareParamEnum.DB_ID
    ),
    userMiddleware.throwIfUserNotExist,
    userController.updateUser);
router.delete('/:userId',
    userMiddleware.throwIfUserNotExist,
    userController.deleteUser);

module.exports = router;

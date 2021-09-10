const router = require('express').Router();

const { adminController } = require('../controller');
const { middlewareParamEnum } = require('../constant');
const { authMiddleware, userMiddleware, generalMiddleware } = require('../middleware');
const { userValidator } = require('../validators');

router.post('/create',
    generalMiddleware.dynamicValidator(userValidator.createUser),
    authMiddleware.checkAccessToken,
    userMiddleware.getUserByDynamicParam(middlewareParamEnum.EMAIL),
    userMiddleware.throwIfUserExist,
    userMiddleware.checkIsAdmin,
    adminController.createUserAdmin);

module.exports = router;

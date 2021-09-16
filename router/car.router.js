const router = require('express').Router();

const { carController } = require('../controller');
const { middlewareParamEnum } = require('../constant');
const { generalMiddleware, carMiddleware } = require('../middleware');
const { carValidator } = require('../validators');

router.get('/', carController.getAllCars);

router.post('/',
    generalMiddleware.dynamicValidator(carValidator.createCarValidator),
    carController.createCar);

router.get('/:carId',
    carMiddleware.getCarByDynamicParam(
        middlewareParamEnum.CAR_ID,
        middlewareParamEnum.PARAM,
        middlewareParamEnum.DB_ID
    ),
    carMiddleware.throwIfCarNotExist,
    carController.getSingleCar);

router.delete('/:carId',
    carMiddleware.getCarByDynamicParam,
    carMiddleware.throwIfCarNotExist,
    carController.deleteCar);

module.exports = router;

const router = require('express').Router();

const { carController } = require('../controllers');
const { carMiddleware, globalMiddleware } = require('../middlewares');
const { middlewareParamEnum } = require('../constants');
const { carValidator } = require('../validators');

router.get('/',
    globalMiddleware.dynamicValidatorMiddleware(carValidator.findAndCreateCarValidator, middlewareParamEnum.REQ_QUERY, true),
    carController.getAllCars);

router.post('/',
    globalMiddleware.dynamicValidatorMiddleware(carValidator.findAndCreateCarValidator),
    carController.createCar);

router.get('/:car_id',
    carMiddleware.getCarByDynamicParams(
        middlewareParamEnum.CAR_ID,
        middlewareParamEnum.REQ_PARAMS,
        middlewareParamEnum.DB_ID
    ),
    carController.getSingleCar);

router.put('/:car_id',
    globalMiddleware.dynamicValidatorMiddleware(carValidator.updateCarValidator),
    carMiddleware.getCarByDynamicParams(
        middlewareParamEnum.CAR_ID,
        middlewareParamEnum.REQ_PARAMS,
        middlewareParamEnum.DB_ID
    ),
    carController.updateCar);

router.delete('/:car_id',
    carMiddleware.getCarByDynamicParams(
        middlewareParamEnum.CAR_ID,
        middlewareParamEnum.REQ_PARAMS,
        middlewareParamEnum.DB_ID
    ),
    carController.deleteCar);

module.exports = router;

const router = require('express').Router();

const { carController } = require('../controllers');
const { carMiddleware } = require('../middlewares');
const { middlewareParamEnum } = require('../constants');

router.get('/',
    carMiddleware.validateQueryParam,
    carController.getAllCars);

router.post('/',
    carMiddleware.validateCreateBody,
    carController.createCar);

router.get('/:car_id',
    carMiddleware.getCarByDynamicParams(
        middlewareParamEnum.CAR_ID,
        middlewareParamEnum.REQ_PARAMS,
        middlewareParamEnum.DB_ID
    ),
    carController.getSingleCar);

router.put('/:car_id',
    carMiddleware.validateUpdateBody,
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

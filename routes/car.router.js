const router = require('express').Router();

const { carController } = require('../controllers');
const { carMiddleware } = require('../middlewares');

router.get('/',
    carMiddleware.validateQueryParam,
    carController.getAllCars);

router.post('/',
    carMiddleware.validateCreateBody,
    carController.createCar);

router.get('/:car_id',
    carMiddleware.getCarByDynamicParams('car_id', 'params', '_id'),
    carController.getSingleCar);

router.put('/:car_id',
    carMiddleware.validateUpdateBody,
    carMiddleware.getCarByDynamicParams('car_id', 'params', '_id'),
    carController.updateCar);

router.delete('/:car_id',
    carMiddleware.getCarByDynamicParams('car_id', 'params', '_id'),
    carController.deleteCar);

module.exports = router;

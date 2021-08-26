const router = require('express').Router();

const { carController } = require('../controllers');

const { carMiddleware } = require('../middlewares');

router.get('/', carController.getAllCars);

router.get('/:carId', carMiddleware.isCarExist, carController.getCarById);

router.post('/', carMiddleware.isCarDataPresent, carController.createCar);

router.put('/:carId', carMiddleware.isCarExist, carMiddleware.isCarDataPresent, carController.updateCar);

router.delete('/:carId', carMiddleware.isCarExist, carController.deleteCar);

module.exports = router;

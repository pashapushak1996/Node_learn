const { carService } = require('../services');

const carController = {
    getAllCars: async (req, res, next) => {
        try {
            const cars = await carService.getAllCar();

            res
                .status(200)
                .json(cars);
        } catch (e) {
            next(e);
        }
    },

    getCarById: (req, res, next) => {
        try {
            const { currentCar } = req;

            res
                .status(200)
                .json(currentCar);
        } catch (e) {
            next(e);
        }
    },

    createCar: async (req, res, next) => {
        try {
            const createdCar = await carService.createCar(req.body);

            res
                .status(201)
                .json(createdCar);
        } catch (e) {
            next(e);
        }
    },

    updateCar: async (req, res, next) => {
        try {
            const { carId } = req;
            const updatedCar = await carService.updateCar(carId, req);

            res
                .status(200)
                .json(updatedCar);
        } catch (e) {
            next(e);
        }
    },

    deleteCar: async (req, res, next) => {
        try {
            const { carId } = req;

            await carService.deleteCar(carId);

            res
                .status(200)
                .json(`Car ${carId} is deleted`);
        } catch (e) {
            next(e);
        }
    }
};

module.exports = carController;

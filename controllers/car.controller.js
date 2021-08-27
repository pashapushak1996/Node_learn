const { carService } = require('../services');

const statusCodes = require('../config/status-codes.enum');

const carController = {
    getAllCars: async (req, res, next) => {
        try {
            const cars = await carService.getAllCar();

            res
                .status(statusCodes.OK)
                .json(cars);
        } catch (e) {
            next(e);
        }
    },

    getCarById: (req, res, next) => {
        try {
            const { currentCar } = req;

            res
                .status(statusCodes.OK)
                .json(currentCar);
        } catch (e) {
            next(e);
        }
    },

    createCar: async (req, res, next) => {
        try {
            const createdCar = await carService.createCar(req.body);

            res
                .status(statusCodes.CREATED)
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
                .status(statusCodes.OK)
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
                .status(statusCodes.NO_CONTENT)
                .json(`Car ${carId} is deleted`);
        } catch (e) {
            next(e);
        }
    }
};

module.exports = carController;

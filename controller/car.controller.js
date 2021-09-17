const { statusCodeEnum } = require('../constant');
const { dbModels: { Car } } = require('../dataBase');
const { carService } = require('../service');

const carController = {
    getAllCars: async (req, res, next) => {
        try {
            const cars = await carService.getAllCars(req.query);

            res.json(cars);
        } catch (e) {
            next(e);
        }
    },

    getSingleCar: (req, res, next) => {
        try {
            res.json(req.car);
        } catch (e) {
            next(e);
        }
    },

    createCar: async (req, res, next) => {
        try {
            const car = await Car.create({ ...req.body });

            res.json(car);
        } catch (e) {
            next(e);
        }
    },

    deleteCar: async (req, res, next) => {
        try {
            try {
                const { carId } = req.params;

                await Car.findOneAndDelete({ _id: carId });

                res.sendStatus(statusCodeEnum.NO_CONTENT);
            } catch (e) {
                next(e);
            }
        } catch (e) {
            next(e);
        }
    }
};

module.exports = carController;

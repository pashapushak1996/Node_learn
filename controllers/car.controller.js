const { statusCodesEnum } = require('../constants');
const { Car } = require('../dataBase');

const carController = {
    getAllCars: async (req, res, next) => {
        try {
            const cars = await Car.find(req.query);

            res.json(cars);
        } catch (e) {
            next(e);
        }
    },

    getSingleCar: (req, res, next) => {
        try {
            res.json(req.currentCar);
        } catch (e) {
            next(e);
        }
    },

    createCar: async (req, res, next) => {
        try {
            const createdCar = await Car.create(req.body);

            res.status(statusCodesEnum.CREATED).json(createdCar);
        } catch (e) {
            next(e);
        }
    },

    updateCar: async (req, res, next) => {
        try {
            const { car_id } = req.params;

            const updatedCar = await Car.findByIdAndUpdate({ _id: car_id }, req.body, { new: true });

            res.json(updatedCar);
        } catch (e) {
            next(e);
        }
    },

    deleteCar: async (req, res, next) => {
        try {
            const { car_id } = req.params;

            await Car.findOneAndDelete({ _id: car_id });

            res.status(statusCodesEnum.NO_CONTENT).json(`Car ${car_id} is deleted`);
        } catch (e) {
            next(e);
        }
    }
};

module.exports = carController;

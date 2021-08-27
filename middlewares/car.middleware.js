const { Car } = require('../dataBase');

const ErrorHandler = require('../errors/ErrorHandler');
const statusCodes = require('../config/statusCodes');

const carMiddleware = {
    isCarExist: async (req, res, next) => {
        try {
            const { carId } = req.params;
            const car = await Car.findById(carId);

            if (!car) {
                throw new ErrorHandler(statusCodes.NOT_FOUND, 'Car not found');
            }

            req.currentCar = car;

            next();
        } catch (e) {
            next(e);
        }
    },

    isCarDataFill: (req, res, next) => {
        try {
            const {
                brand,
                model,
                year,
                price
            } = req.body;

            const isDataPresent = brand && model && year && price;

            if (!isDataPresent) {
                throw new ErrorHandler(statusCodes.OK, 'Data is required');
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isValidPrice: (req, res, next) => {
        try {
            const { price } = req.body;

            const isValidPrice = price > 0;

            if (!isValidPrice) {
                throw new ErrorHandler(statusCodes.OK, 'Price must be greater than 0');
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isValidYear: (req, res, next) => {
        try {
            const { year } = req.body;

            const isValidYear = year > 1888;

            if (!isValidYear) {
                throw new ErrorHandler(statusCodes.OK, 'Year must be greater than 1888');
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};

module.exports = carMiddleware;

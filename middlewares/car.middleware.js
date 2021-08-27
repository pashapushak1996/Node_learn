const { Car } = require('../dataBase');

const ErrorHandler = require('../errors/ErrorHandler');
const statusCodes = require('../config/status-codes.enum');
const carErrorMessages = require('../config/carError.messages');

const carMiddleware = {
    isCarExist: async (req, res, next) => {
        try {
            const { carId } = req.params;
            const car = await Car.findById(carId);

            if (!car) {
                throw new ErrorHandler(statusCodes.NOT_FOUND, carErrorMessages.CAR_IS_EXIST);
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
                throw new ErrorHandler(statusCodes.OK, carErrorMessages.REQUIRED);
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
                throw new ErrorHandler(statusCodes.OK, carErrorMessages.PRICE_GTE);
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
                throw new ErrorHandler(statusCodes.OK, carErrorMessages.YEAR_GTE);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};

module.exports = carMiddleware;

const Car = require('../dataBase/Car');

const ErrorHandler = require('../errors/ErrorHandler');

const carMiddleware = {
    isCarExist: async (req, res, next) => {
        try {
            const { carId } = req.params;
            const car = await Car.findById(carId);

            if (!car) {
                throw new ErrorHandler(404, 'Car not found');
            }

            req.currentCar = car;

            next();
        } catch (e) {
            next(e);
        }
    },
    isCarDataPresent: (req, res, next) => {
        try {
            const {
                brand,
                model,
                year,
                price
            } = req.body;

            const isDataPresent = brand && model && year && price;

            if (!isDataPresent) {
                throw new ErrorHandler(200, 'Data is required');
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    isValidPrice: (req, res, next) => {
        try {
            const {
                price
            } = req.body;

            const isValidPrice = price > 0;

            if (!isValidPrice) {
                throw new ErrorHandler(200, 'Price must be greater than 0');
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};

module.exports = carMiddleware;

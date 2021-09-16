const { middlewareParamEnum, statusCodeEnum } = require('../constant');
const { dbModels: { Car } } = require('../dataBase');
const { ErrorHandler, errorMessageEnum } = require('../error');

const carMiddleware = {
    getCarByDynamicParam: (
        paramName,
        searchIn = middlewareParamEnum.BODY,
        dbFiled = paramName
    ) => async (req, res, next) => {
        try {
            const value = req[searchIn][paramName];

            const car = await Car.findOne({ [dbFiled]: value });

            req.car = car;

            next();
        } catch (e) {
            next(e);
        }
    },

    throwIfCarNotExist: (req, res, next) => {
        try {
            const { car } = req;

            if (!car) {
                throw new ErrorHandler(
                    statusCodeEnum.NOT_FOUND,
                    errorMessageEnum.RECORD_NOT_FOUND
                );
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};

module.exports = carMiddleware;

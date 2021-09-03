const { Car } = require('../dataBase');
const { ErrorHandler, errorMessages } = require('../error');
const { statusCodesEnum, middlewareParamEnum } = require('../constants');

const carMiddleware = {
    getCarByDynamicParams: (
        paramName,
        searchIn = middlewareParamEnum.REQ_BODY,
        dbFiled = paramName
    ) => async (req, res, next) => {
        try {
            const value = req[searchIn][paramName];

            const currentCar = await Car.findOne({ [dbFiled]: value });

            if (!currentCar) {
                throw new ErrorHandler(statusCodesEnum.NOT_FOUND, errorMessages.NOT_FOUND_ERR);
            }

            req.currentCar = currentCar;

            next();
        } catch (e) {
            next(e);
        }
    }
};

module.exports = carMiddleware;

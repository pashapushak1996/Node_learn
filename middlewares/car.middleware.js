const { Car } = require('../dataBase');
const { carValidator } = require('../validators');
const { ErrorHandler, errorMessages } = require('../error');
const { statusCodesEnum, middlewareParamEnum } = require('../constants');

const carMiddleware = {
    validateCreateBody: async (req, res, next) => {
        try {
            const { error } = await carValidator.findAndCreateCarValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(statusCodesEnum.BAD_REQUEST, errorMessages.REQ_BODY_IS_WRONG);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    validateUpdateBody: async (req, res, next) => {
        try {
            const { error } = await carValidator.updateCarValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(statusCodesEnum.BAD_REQUEST, errorMessages.REQ_BODY_IS_WRONG);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    validateQueryParam: async (req, res, next) => {
        try {
            const { error } = await carValidator.findAndCreateCarValidator.validate({ ...req.query, isQuery: true });

            if (error) {
                throw new ErrorHandler(statusCodesEnum.BAD_REQUEST, errorMessages.NOT_FOUND_ERR);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

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

const { dbModels } = require('../dataBase');
const { queryBuilderParamEnum } = require('../constant');

const carService = {
    getAllCars: async (query) => {
        const {
            count = 10,
            page = 1,
            sortBy = queryBuilderParamEnum.CREATED_AT,
            order = queryBuilderParamEnum.SORT_ASC,
            ...filters
        } = query;

        const orderBy = order === queryBuilderParamEnum.SORT_ASC ? -1 : 1;

        const filterObj = {};
        const yearFilter = {};

        Object.keys(filters).forEach((paramName) => {
            switch (paramName) {
                case queryBuilderParamEnum.PRODUCER: {
                    filterObj.producer = { $regex: `^${filters.producer}`, $options: 'gi' };
                    break;
                }
                case queryBuilderParamEnum.MODEL: {
                    filterObj.model = { $regex: `^${filters.model}`, $options: 'gi' };
                    break;
                }
                case queryBuilderParamEnum.AGE_LTE: {
                    Object.assign(yearFilter, { $lte: +filters[queryBuilderParamEnum.AGE_LTE] });

                    break;
                }
                case queryBuilderParamEnum.AGE_GTE: {
                    Object.assign(yearFilter, { $gte: +filters[queryBuilderParamEnum.AGE_GTE] });

                    break;
                }
                default: {
                    filterObj[paramName] = filters[paramName];
                }
            }
        });

        const cars = await dbModels.Car
            .find(filterObj)
            .sort({ [sortBy]: orderBy })
            .limit(count)
            .skip((page - 1) * count);

        return cars;
    }
};

module.exports = carService;

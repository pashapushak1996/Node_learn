const { dbModels } = require('../dataBase');
const { queryBuilderParamEnum } = require('../constant');

const userService = {
    getAllUsers: async (query = {}) => {
        const {
            count = 10,
            page = 1,
            sortBy = queryBuilderParamEnum.CREATED_AT,
            order = queryBuilderParamEnum.SORT_ASC,
            ...filters
        } = query;

        const orderBy = order === queryBuilderParamEnum.SORT_ASC ? -1 : 1;

        const filterObj = {};
        const ageFilter = {};

        Object.keys(filters).forEach((paramName) => {
            switch (paramName) {
                case queryBuilderParamEnum.ROLE: {
                    const rolesArr = filters.role.split('');

                    filterObj.role = { $in: rolesArr };

                    break;
                }
                case queryBuilderParamEnum.NAME: {
                    filterObj.name = { $regex: `^${filters.name}`, $options: 'gi' };

                    break;
                }
                case queryBuilderParamEnum.AGE_LTE: {
                    Object.assign(ageFilter, { $lte: +filters[queryBuilderParamEnum.AGE_LTE] });

                    break;
                }
                case queryBuilderParamEnum.AGE_GTE: {
                    Object.assign(ageFilter, { $gte: +filters[queryBuilderParamEnum.AGE_GTE] });

                    break;
                }
                case queryBuilderParamEnum.EMAIL: {
                    filterObj.email = { $regex: `^${filters.email}`, $options: 'gi' };

                    break;
                }
                default: {
                    filterObj[paramName] = filters[paramName];
                }
            }
        });

        if (Object.keys(ageFilter).length) {
            filterObj.age = ageFilter;
        }

        const users = await dbModels.User
            .find(filterObj)
            .sort({ [sortBy]: orderBy })
            .limit(count)
            .skip((page - 1) * count);

        return users;
    }
};

module.exports = userService;

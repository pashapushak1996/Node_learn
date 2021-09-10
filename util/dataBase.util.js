const { userRolesEnum } = require('../constant');
const { dbModels } = require('../dataBase');

module.exports = {
    _createSuperAdmin: async (
        name = userRolesEnum.ADMIN,
        email = userRolesEnum.ADMIN,
        password = userRolesEnum.ADMIN
    ) => {
        const users = await dbModels.User.find({});
        if (!users.length) {
            await dbModels.User.create({
                name,
                email,
                password,
                role: userRolesEnum.SUPER_ADMIN
            });
        }
    }
};

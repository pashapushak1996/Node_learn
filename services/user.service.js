const User = require('../dataBase/User');

const userService = {
    deleteUser: async (id) => {
        await User.deleteOne({ _id: id });
    },
    createUser: async (body) => {
        const createdUser = await User.create({ ...body });

        return createdUser;
    },
    updateUser: async (userId, req) => {
        const updatedUser = await User.findOneAndUpdate(
            { _id: userId },
            { $set: { ...req.body } },
            {
                new: true
            }
        );

        return updatedUser;
    },
    getAllUsers: async () => {
        const users = await User.find();

        return users;
    }
};

module.exports = userService;

const User = require('../dataBase/User');

const userService = {
    deleteUser: async (id) => {
        await User.deleteOne({ _id: id });
    },
    createUser: async (req) => {
        const createdUser = await User.create({ ...req.body });

        return createdUser;
    },
    updateUser: async (id, req) => {
        const updatedUser = await User.updateOne({ _id: id }, { ...req.body });

        return updatedUser;
    },
    getAllUsers: async () => {
        const users = await User.find();

        return users;
    }
};

module.exports = userService;

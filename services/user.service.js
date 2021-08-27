const User = require('../dataBase/User');

const userService = {
    deleteUser: (userId) => User.deleteOne({ _id: userId }),

    createUser: (body) => User.create({ ...body }),

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

    getAllUsers: () => User.find()
};

module.exports = userService;

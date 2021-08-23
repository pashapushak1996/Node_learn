const userService = require('../services/user.service');
const { userDataValidator } = require('../utils');

module.exports = {
    getAllUsers: async (req, res) => {
        const users = await userService.getUsersFromDB();
        res.json(users);
    },

    getUserById: async (req, res) => {
        const { user_id } = req.params;
        const currentUser = await userService.getUserById(user_id);

        if (!currentUser) {
            return res.status(404).json('user not found');
        }

        res.json(currentUser);
    },

    createUser: async (req, res) => {
        const { email, password } = req.body;
        const currentUser = await userService.findUserByEmail(email);

        if (currentUser) {
            res.json('User is exist');
            return;
        }

        const isValidData = userDataValidator(email, password);

        if (isValidData) {
            const usersFromDb = await userService.saveUserToDB(email, password);
            res.status(201).json(usersFromDb);
            return;
        }

        res.status(400).json('Email or password is incorrect');
    },

    deleteUser: async (req, res) => {
        const { user_id } = req.params;
        const selectedUser = await userService.getUserById(user_id);

        if (!selectedUser) {
            res.status(404).json('User not found');
            return;
        }

        const filteredUsers = await userService.deleteUserFromDB(user_id);

        res.status(200).json(filteredUsers);
    },

    updateUser: async (req, res) => {
        const { user_id } = req.params;

        const currentUser = await userService.getUserById(user_id);

        if (!currentUser) {
            res.status(404).json('User not found');
            return;
        }

        const updatedUsers = await userService.updateUserFromDB(user_id, req.body);

        res.status(202).json(updatedUsers);
    }
};

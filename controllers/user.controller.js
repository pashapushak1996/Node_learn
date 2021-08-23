const userService = require('../services/user.service');
const { userDataValidator } = require('../utils');

module.exports = {
    getAllUsers: async (req, res) => {
        const users = await userService.getUsersFromDB();
        res.json(users);
    },

    getUserById: async (req, res) => {
        const { user_id } = req.params;
        const users = await userService.getUsersFromDB();

        const currentUser = users.find((user) => user.userId === user_id);

        if (!currentUser) {
            return res.status(404).json('user not found');
        }

        res.json(currentUser);
    },

    createUser: async (req, res) => {
        const { email, password } = req.body;
        const users = await userService.getUsersFromDB();

        const currentUser = users.find((user) => user.email === email);

        if (currentUser) {
            res.json('User is exist');
            return;
        }

        const isValidData = userDataValidator(email, password);
        const lastUserId = users.length > 0 ? users.pop().userId : 0;

        const createdUser = {
            userId: lastUserId + 1,
            email,
            password
        };

        if (isValidData) {
            users.push(createdUser);
            await userService.setUsersToDB(users);
            res.status(201).json(users);
            return;
        }

        res.status(400).json('Email or password is incorrect');
    },

    deleteUser: async (req, res) => {
        const { user_id } = req.params;
        const users = await userService.getUsersFromDB();

        const selectedUser = users.find((user) => user.userId === +user_id);

        if (!selectedUser) {
            res.status(404).json('User not found');
            return;
        }

        const filteredUsers = users.filter((user) => user.userId !== user_id);

        await userService.setUsersToDB(filteredUsers);

        res.status(204);
    }
    ,

    updateUser: async (req, res) => {
        const { user_id } = req.params;
        const users = await userService.getUsersFromDB();

        const currentUser = users.find((user) => user.userId === +user_id);

        if (!currentUser) {
            res.status(404).json('User not found');
            return;
        }

        const updatedUsers = users.map((user) => {
            if (user.userId === +user_id) {
                return { ...user, ...req.body };
            }

            return user;
        });

        await userService.setUsersToDB(updatedUsers);

        res.status(202).json(updatedUsers);
    }
};

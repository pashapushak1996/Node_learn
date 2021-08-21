const users = require('../db/users');

module.exports = {
    getUsers: (req, res) => {
        res.json(users);
    },
    getUserById: (req, res) => {
        const { user_id } = req.params;
        const currentUser = users[user_id];
        if (!currentUser) {
            return res.status(404).json('user not found');
        }

        res.json(currentUser);
    },
    createUser: (req, res) => {
        console.log(req.body);
        const { email, password } = req.body;
        const currentUser = users.find((user) => user.email === email);

        if (!currentUser) {
            res.json('User is exist');
            return;
        }

        const isPasswordExist = password.length > 0;
        const lastUserId = users.pop().userId;
        const createdUser = {
            userId: lastUserId + 1,
            email,
            password
        };

        if (isPasswordExist) {
            users.push(createdUser);
            res.json(`user ${email} created`, users);
        }

        res.status(400).json('password is required');
    },
    deleteUser: (req, res) => {
        const { user_id } = req.params;
        const selectedUser = users[user_id];

        if (!selectedUser) {
            res.status(404).json('User not found');
        }

        const filteredUsers = users.filter((user) => user.userId !== +user_id);

        res.status(200).json(filteredUsers);
    },
    updateUser: (req, res) => {
        console.log(req);
        console.log(res);
    }
};

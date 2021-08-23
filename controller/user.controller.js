const userService = require('../service/user.service');

module.exports = {
    getAllUsers: async (req, res) => {
        const users = await userService.getUsersFromDB();
        res.render('users', users);
    },

    getUserById: async (req, res) => {
        const { userId } = req.params;
        const users = await userService.getUsersFromDB();

        const currentUser = users.find((user) => user.userId === userId);

        if (!currentUser) {
            res.end('User not found');
            return;
        }

        res.render('users', { user: currentUser });
    },

    createUser: async (req, res) => {
        const { email, password } = req.body;
        const users = await userService.getUsersFromDB();

        const currentUser = users.find((user) => user.email === email);

        if (currentUser) {
            res.redirect('/auth');
            return;
        }

        const lastUserId = users.length > 0 ? users.pop().userId : 0;

        const createdUser = {
            userId: lastUserId,
            email,
            password
        };

        users.push(createdUser);

        await userService.saveUsersToDB(users);

        res.redirect('/auth');
    }
};

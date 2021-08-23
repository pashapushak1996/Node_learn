const userService = require('../service/user.service');

module.exports = {
    login: async (req, res) => {
        const { email, password } = req.body;

        const users = await userService.getUsersFromDB();

        const currentUser = users.find((user) => user.email === email);

        if (!currentUser) {
            res.render('register');
            return;
        }

        const isValidPassword = currentUser.password === password;

        if (isValidPassword) {
            res.render('users', { user: currentUser });
            return;
        }

        res.end('Password is incorrect');
    },
    showAuthPage: (req, res) => {
        res.render('login');
    }
};

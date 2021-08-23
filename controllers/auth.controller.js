const userService = require('../services/user.service');

module.exports = {
    login: (req, res) => {
        const { email, password } = req.body;
        const users = userService.getUsersFromDB();

        const currentUser = users.find((user) => user.email === email);

        if (!currentUser) {
            res.redirect('auth/register');
            return;
        }

        const isTruePassword = currentUser.password === password;

        if (isTruePassword) {
            res.status(200).json(currentUser);
            return;
        }

        res.status(401).json('Password incorrect');
    },

    register: (req, res) => {
        res.json('register page');
    }
};

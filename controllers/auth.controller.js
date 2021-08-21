const users = require('../db/users');

module.exports = {
    login: (req, res) => {
        const { email, password } = req.body;

        const currentUser = users.find((user) => user.email === email);

        if (!currentUser) {
            res.redirect('/register');
            return;
        }

        const isTruePassword = currentUser.password === password;

        if (isTruePassword) {
            res.status(200).json(currentUser);
            return;
        }

        res.status(401).json('Password incorrect');
    }
};

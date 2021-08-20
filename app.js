const express = require('express');
const expressHbs = require('express-handlebars');
const path = require('path');

const { PORT } = require('./config/variables');
const users = require('./db/users');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.urlencoded({ extended: true }));

app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({
    defaultLayout: false
}));
app.set('views', path.join(__dirname, 'static'));


app.listen(PORT, () => {
    console.log('Localhost:', PORT);
});


app.get(`/`, (req, res) => {
    res.render('home');
})


app.get(`/login`, (req, res) => {
    res.render(`login`);
});


app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const currentUser = users.find((user, password) => user.email === email);
    const isLogged = currentUser?.password === password && password.length > 0;

    if (!currentUser) {
        res.render('register');
        return;
    }

    if (isLogged) {
        res.render('users', { currentUser, users });
        return;
    }

    if (!isLogged) {
        res.end('Your password is wrong');
    }
});


app.get(`/users`, (req, res) => {
    res.render(`users`, { users });
});


app.get(`/users/:user_id`, (req, res) => {
    const { user_id } = req.params;
    const currentUser = users[user_id];

    if (!currentUser) {
        res.status(404).end('User not found');
        return;
    }

    res.render(`users`, { currentUser });
});


app.get(`/register`, (req, res) => {
    res.render('register');
});


app.post('/register', ((req, res) => {
    const { email, password } = req.body;
    const currentUser = users.find((user) => user.email === email);

    if (!currentUser) {
        users.push(req.body);
        res.render('login');
    }

    if (currentUser) {
        res.end('This user is exist');
    }

}));

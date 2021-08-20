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
    const currentUser = users.find((user) => user.email === email);


    if (!currentUser) {
        res.render('register');
        return;
    }

    const isLogged = currentUser?.password === password;

    if (isLogged) {
        res.render('user', { currentUser ,isLogged});
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

    res.render(`user`, { currentUser });
});


app.get(`/register`, (req, res) => {
    res.render('register');
});


app.post('/register', ((req, res) => {
    const { email, password } = req.body;
    const currentUser = users.find((user) => user.email === email);
    const isPasswordExist = password.length !== 0;

    if (currentUser) {
        res.end('This user is exist');
        return;
    }

    if (!currentUser && isPasswordExist) {
        users.push(req.body);
        res.render('login');
        return;
    }

    if (!isPasswordExist) {
        res.status(400).end('You must write password');
    }

}));


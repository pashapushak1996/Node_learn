//создаем страницу регистрации логинации и калькулятор
// запись юзеров производим в json файл
// только залогиненый юзер может зайти на калькулятор
const express = require('express');
const expressHbs = require('express-handlebars');
const path = require('path');

const { promisifyReadFile, promisifyWriteFile } = require('./utils/promisifyFunction');

const app = express();

const pathToDB = path.join(__dirname, 'db', 'users.json');
const pathToStatic = path.join(__dirname, 'static');


const getUsers = async () => {
    const users = await promisifyReadFile(pathToDB);
    return JSON.parse(users.toString());
};

const saveUserToDB = async (user) => {
    const users = await getUsers();
    users.push(user);
    await promisifyWriteFile(pathToDB, JSON.stringify(users)).catch(err => {
        if (err) {
            console.log(err);
        }
    });
};


app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.listen(5000, () => {
    console.log('Localhost:', 5000);
})

app.set("view engine", '.hbs');
app.engine('.hbs', expressHbs({
    defaultLayout: false
}));
app.set("views", pathToStatic);

app.get('/', (req, res) => {
    res.render('home');
});

app.get(`/login`, (req, res) => {
    res.render('login');
});

app.post(`/login`, async (req, res) => {
    const users = await getUsers();
    const { email, password } = req.body;
    const currentUser = users.find((user) => user.email === email);

    if (!currentUser) {
        return res.redirect(`/register`);
    }

    const isPasswordTrue = currentUser.password === password;

    isPasswordTrue ? res.render('user', { currentUser }) : res.end('Password is wrong');
})

app.get(`/register`, (req, res) => {
    res.render('register');
})

app.get('/users', async (req, res) => {
    const users = await getUsers();
    res.render('users', { users });
});

app.post(`/users`, async (req, res) => {
    const users = await getUsers();
    const lastUserId = users.pop().id;
    const { username, email, password } = req.body;
    const currentUser = users.find((user) => user.email === email);

    if (currentUser) {
        return res.end('User is exist');
    }

    const isPasswordExist = password.length > 0;

    if (!isPasswordExist) {
        return res.end('You must write password');
    }

    const user = { id: lastUserId + 1, username, email, password };
    await saveUserToDB(user);
    res.redirect('/login');
});

app.get(`/users/:user_id`, (req, res) => {
    const { user_id } = req.params;

})
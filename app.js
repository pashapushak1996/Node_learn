const express = require('express');
const expressHbs = require('express-handlebars');
const path = require('path');

const { userRouter, authRouter } = require('./router');

const app = express();

const pathToStatic = path.join(__dirname, 'static');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'hbs');
app.engine('hbs', expressHbs({ defaultLayout: false }));
app.set('views', pathToStatic);

app.listen(5000, () => {
    console.log('App start on localhost:', 5000);
});

app.use('/auth', authRouter);
app.use('/users', userRouter);

const express = require('express');

const { PORT } = require('./config/varialbles');

const app = express();

app.listen(PORT, () => {
    console.log('App listen on localhost:', PORT);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);
app.use('*',);

const _notFoundError = (err, req, res, next) => {

}
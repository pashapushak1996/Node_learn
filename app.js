const express = require('express');
const mongoose = require('mongoose');

const { PORT, MONGO_CONNECTION } = require('./config/varialbles');
const { userRouter, carRouter } = require('./routes');

const app = express();

mongoose.connect(`${MONGO_CONNECTION}node-learn`);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/cars', carRouter);
app.use('/users', userRouter);
app.use('*', _notFoundError);
app.use(_mainErrorHandler);

app.listen(PORT, () => {
    console.log('App listen on localhost:', PORT);
});

function _notFoundError(err, req, res, next) {
    next({
        status: err.status || 404,
        message: err.message || 'Not found'
    });
}

// eslint-disable-next-line no-unused-vars
function _mainErrorHandler(err, req, res, next) {
    res
        .status(err.status || 500)
        .json(err.message);
}

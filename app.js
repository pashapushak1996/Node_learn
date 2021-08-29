const express = require('express');
const mongoose = require('mongoose');
const { authRouter } = require('./router');

const { userRouter } = require('./router');
const { variables, statusCodesEnum } = require('./config');

mongoose.connect(variables.MONGO_CONNECTION);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(variables.PORT, () => {
    console.log(`App listen on  localhost ${variables.PORT}`);
});

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('*', _notFoundErrorHandler);
app.use(_mainErrorHandler);

function _notFoundErrorHandler(err, req, res, next) {
    next({
        status: err.status || statusCodesEnum.NOT_FOUND,
        message: err.message || 'Not found'
    });
}

// eslint-disable-next-line no-unused-vars
function _mainErrorHandler(err, req, res, next) {
    res.json({
        status: err.status || statusCodesEnum.SERVER_ERROR,
        message: err.message || 'Internal server error'
    });
}

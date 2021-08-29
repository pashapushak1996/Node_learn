const express = require('express');
const mongoose = require('mongoose');

const { errorMessages } = require('./error');
const { userRouter, authRouter } = require('./router');
const { variables } = require('./config');
const { statusCodesEnum } = require('./constants/enum');

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
        message: err.message || errorMessages.NOT_FOUND_ERR
    });
}

// eslint-disable-next-line no-unused-vars
function _mainErrorHandler(err, req, res, next) {
    res
        .status(err.status || statusCodesEnum.SERVER_ERROR)
        .json({
            message: err.message || errorMessages.INTERNAL_SERVER_ERROR
        });
}

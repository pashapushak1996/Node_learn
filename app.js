const express = require('express');
const mongoose = require('mongoose');
const expressFileUpload = require('express-fileupload');

require('dotenv').config();

const { statusCodeEnum } = require('./constant');
const { variables } = require('./config');
const { errorMessageEnum, ErrorHandler } = require('./error');
const { authRouter, userRouter, adminRouter } = require('./router');
const { dbUtil } = require('./util');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressFileUpload());

_startServer();

app.use('/admin', adminRouter);
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('*', _notFoundErrorHandler);
app.use(_mainErrorHandler);

function _notFoundErrorHandler(err, req, res, next) {
    next({
        status: err.status || statusCodeEnum.NOT_FOUND,
        message: err.message || errorMessageEnum.NOT_FOUND_ERR
    });
}

// eslint-disable-next-line no-unused-vars
function _mainErrorHandler(err, req, res, next) {
    res
        .status(err.status || statusCodeEnum.SERVER_ERROR)
        .json({
            message: err.message || errorMessageEnum.INTERNAL_SERVER_ERROR
        });
}

async function _startServer() {
    try {
        await mongoose.connect(variables.DB_CONNECTION_URL);

        await dbUtil._createSuperAdmin();

        app.listen(variables.PORT, () => {
            console.log(`App listen on localhost//:${variables.PORT}`);
        });
    } catch (e) {
        throw new ErrorHandler(statusCodeEnum.SERVER_ERROR, errorMessageEnum.INTERNAL_SERVER_ERROR);
    }
}

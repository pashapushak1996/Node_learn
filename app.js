const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const expressFileUpload = require('express-fileupload');
const rateLimit = require('express-rate-limit');
const swaggerUi = require('swagger-ui-express');

require('dotenv').config();

const { statusCodeEnum } = require('./constant');
const { variables } = require('./config');
const cronJobs = require('./cron');
const { errorMessageEnum, ErrorHandler } = require('./error');
const {
    authRouter,
    userRouter,
    adminRouter,
    carRouter
} = require('./router');
const { dbUtil } = require('./util');

const app = express();

app.use(helmet());

app.use(cors({ origin: _configureCors }));

app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressFileUpload());

if (process.env.NODE_DEV === 'dev') {
    // eslint-disable-next-line import/no-extraneous-dependencies
    const morgan = require('morgan');
    app.use(morgan('dev'));
}

_startServer();

app.use('/docs', swaggerUi.serve, swaggerUi.setup());
app.use('/admin', adminRouter);
app.use('/auth', authRouter);
app.use('/cars', carRouter);
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

        cronJobs();

        await dbUtil._createSuperAdmin();

        app.listen(variables.PORT, () => {
            console.log(`App listen on localhost//:${variables.PORT}`);
        });
    } catch (e) {
        throw new ErrorHandler(statusCodeEnum.SERVER_ERROR, errorMessageEnum.INTERNAL_SERVER_ERROR);
    }
}

function _configureCors(origin, cb) {
    const whiteList = variables.ALLOWED_ORIGINS.split(';');

    if (!origin && process.env.NODE_DEV === 'dev') {
        return cb(null, true);
    }

    if (!whiteList.includes(origin)) {
        return cb(new ErrorHandler(statusCodeEnum.FORBIDDEN, errorMessageEnum.CORS_ERR), false);
    }

    return cb(null, true);
}

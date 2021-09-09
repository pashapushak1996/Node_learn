module.exports = {
    ACTIVATE_ACC_SECRET_KEY: process.env.ACTIVATE_ACC_SECRET_KEY || 'activate',
    FORGET_PASS_SECRET_KEY: process.env.FORGET_PASS_SECRET_KEY || 'forget',
    ACCESS_SECRET_KEY: process.env.ACCESS_SECRET_KEY || 'access',
    DB_CONNECTION_URL: process.env.DB_CONNECTION || 'mongodb://localhost:27017/node-learn',
    REFRESH_SECRET_KEY: process.env.REFRESH_SECRET_KEY || 'refresh',
    PORT: process.env.PORT || 5000,
    SALT: 10,
    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL || 'example@gmail.com',
    NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD || '123456',
    FRONTEND_URL: process.env.FRONTEND_URL || 'www.google.com',
};

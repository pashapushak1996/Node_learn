module.exports = {
    DB_CONNECTION_URL: process.env.DB_CONNECTION || 'mongodb://localhost:27017/node-learn',
    PORT: process.env.PORT || 5000,
    SALT: 10,
    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL || 'example@gmail.com',
    NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD || '123456',
    FRONTEND_URL: process.env.FRONTEND_URL || 'www.google.com',
    AWS: {
        S3_NAME: process.env.AWS_S3_NAME || '',
        S3_REGION: process.env.AWS_S3_REGION || '',
        S3_ACCESS_KEY: process.env.AWS_S3_ACCESS_KEY || '',
        S3_SECRET_KEY: process.env.AWS_S3_SECRET_KEY || ''
    },
    JWT_KEYS: {
        ACTIVATE_ACC_SECRET_KEY: process.env.ACTIVATE_ACC_SECRET_KEY || 'activate',
        FORGET_PASS_SECRET_KEY: process.env.FORGET_PASS_SECRET_KEY || 'forget',
        ACCESS_SECRET_KEY: process.env.ACCESS_SECRET_KEY || 'access',
        REFRESH_SECRET_KEY: process.env.REFRESH_SECRET_KEY || 'refresh',
    }
};

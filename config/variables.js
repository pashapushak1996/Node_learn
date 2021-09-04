module.exports = {
    ACCESS_SECRET_KEY: process.env.ACCESS_SECRET_KEY || 'access',
    DB_CONNECTION_URL: process.env.DB_CONNECTION || 'mongodb://localhost:27017/node-learn',
    REFRESH_SECRET_KEY: process.env.REFRESH_SECRET_KEY || 'refresh',
    PORT: process.env.PORT || 5000,
    SALT: 10
};

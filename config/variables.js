module.exports = {
    PORT: process.env.PORT || 5000,
    DB_CONNECTION: process.env.DB_CONNECTION || 'mongodb://localhost:27017/node-learn',
    CURRENT_YEAR: new Date().getFullYear(),
    ACCESS_SECRET_KEY: process.env.ACCESS_SECRET_KEY || 'access',
    REFRESH_SECRET_KEY: process.env.REFRESH_SECRET_KEY || 'refresh'
};

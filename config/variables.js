module.exports = {
    PORT: process.env.PORT || 5000,
    DB_CONNECTION: process.env.DB_CONNECTION || 'mongodb://localhost:27017/node-learn',
    CURRENT_YEAR: new Date().getFullYear()
};

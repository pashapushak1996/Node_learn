const cron = require('node-cron');

const cronMailer = require('./cronSendMail');

module.exports = () => {
    cron.schedule('30 6 * * 1,3,5', async () => {
        await cronMailer();
    });
};

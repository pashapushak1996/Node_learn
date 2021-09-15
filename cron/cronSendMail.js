const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');

const { emailTemplatesEnum } = require('../constant');
const { dbModels } = require('../dataBase');
const { emailService } = require('../service');

dayjs.extend(utc);

module.exports = async () => {
    const previousDate = dayjs.utc().subtract(10, 'day');

    const AuthTokens = await dbModels.OAuth.find({ createdAt: { $lte: previousDate } });

    await Promise.all(AuthTokens.map(async ({ user }) => {
        await emailService.sendMessage(user.email, emailTemplatesEnum.ACCOUNT_REMIND, { userName: user.name });
    }));
};

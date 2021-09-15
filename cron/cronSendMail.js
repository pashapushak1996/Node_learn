const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');

const { emailTemplatesEnum } = require('../constant');
const { dbModels } = require('../dataBase');
const { emailService } = require('../service');

dayjs.extend(utc);

module.exports = async () => {
    const previousDate = dayjs.utc().subtract(10, 'day');

    const AuthTokens = await dbModels.OAuth.find({ createdAt: { $lte: previousDate } });

    await Promise.all(AuthTokens.map(async (token) => {
        const { email, name } = token.user;

        await emailService.sendMessage(email, emailTemplatesEnum.ACCOUNT_REMIND, { userName: name });
    }));
};

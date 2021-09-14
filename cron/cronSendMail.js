const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');

const { emailTemplatesEnum } = require('../constant');

const { dbModels } = require('../dataBase');

const { emailService } = require('../service');

dayjs.extend(utc);

module.exports = async () => {
    const previousDate = dayjs.utc().subtract(10, 'day');

    const AuthTokens = await dbModels.OAuth.find({ createdAt: { $lte: previousDate } });

    const users = AuthTokens.map((Obj) => Obj.user);

    await _sendEmailRecursion(users);
};

let i = 0;

async function _sendEmailRecursion(items) {
    i++;
    if (i > items.length - 1) {
        return;
    }
    const { email, name } = items[i];

    await emailService.sendMessage(email, emailTemplatesEnum.ACCOUNT_REMIND, { userName: name });
}

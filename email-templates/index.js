const { emailTemplatesEnum } = require('../constant');

module.exports = {
    [emailTemplatesEnum.USER_IS_LOGGED]: {
        templateName: 'welcome',
        subject: 'Welcome to our platform'
    },

    [emailTemplatesEnum.ACCOUNT_UPDATED]: {
        templateName: 'accountUpdated',
        subject: 'Account updated'
    },

    [emailTemplatesEnum.ACCOUNT_CREATED]: {
        templateName: 'accountCreated',
        subject: 'Account created'
    },

    [emailTemplatesEnum.DELETE_ACCOUNT_ADMIN]: {
        templateName: 'accountDeletedAdmin',
        subject: 'Account deleted'
    },

    [emailTemplatesEnum.DELETE_ACCOUNT_USER]: {
        templateName: 'accountDeletedUser',
        subject: 'Account deleted'
    },

    [emailTemplatesEnum.FORGOT_PASSWORD]: {
        templateName: 'forgotPassword',
        subject: 'Forgot password'
    },

    [emailTemplatesEnum.CHANGE_PASSWORD]: {
        templateName: 'passwordChanged',
        subject: 'Change password'
    },

    [emailTemplatesEnum.ACCOUNT_ACTIVATED]: {
        templateName: 'accountActivated',
        subject: 'Activate account'
    }
};

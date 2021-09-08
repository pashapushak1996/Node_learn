const EmailTemplates = require('email-templates');
const nodemailer = require('nodemailer');
const path = require('path');

const { variables: { FRONTEND_URL } } = require('../config');
const { statusCodeEnum } = require('../constant');
const allTemplates = require('../email-templates');
const { ErrorHandler, errorMessageEnum } = require('../error');

const pathToViews = path.join(process.cwd(), 'email-templates');

const templateParser = new EmailTemplates({
    views: {
        root: pathToViews
    }
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NO_REPLY_EMAIL,
        pass: process.env.NO_REPLY_EMAIL_PASSWORD
    }
});

const sendMessage = async (userMail, templateAction, templatePayload = {}) => {
    const template = allTemplates[templateAction];

    if (!template) {
        throw new ErrorHandler(
            statusCodeEnum.SERVER_ERROR,
            errorMessageEnum.TEMPLATE_NOT_FOUND
        );
    }

    const { templateName, subject } = template;

    const html = await templateParser.render(
        templateName,
        {
            ...templatePayload,
            frontendUrl: FRONTEND_URL
        }
    );

    return transporter.sendMail({
        from: 'NO REPLY',
        to: userMail,
        subject,
        html
    });
};

module.exports = {
    sendMessage
};

const { Schema, model } = require('mongoose');

const { dbModelsEnum } = require('../constants');

const OAuthScheme = new Schema({
    access_token: {
        type: String,
        required: true
    },
    refresh_token: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: dbModelsEnum.USER
    }
});

module.exports = model(dbModelsEnum.OAUTH, OAuthScheme);

const { Schema, model } = require('mongoose');

const { dbModelsEnum } = require('../../constant');

const OAuthSchema = new Schema({
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
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

OAuthSchema.pre('findOne', function() {
    this.populate(dbModelsEnum.USER);
});

OAuthSchema.pre('find', function() {
    this.populate(dbModelsEnum.USER);
});

module.exports = model(dbModelsEnum.OAUTH, OAuthSchema);

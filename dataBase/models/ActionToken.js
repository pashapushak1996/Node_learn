const { Schema, model } = require('mongoose');

const { dbModelsEnum } = require('../../constant');

const ActionTokenSchema = new Schema({
    action_token: {
        type: String,
        required: true,
        trim: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: dbModelsEnum.USER
    },
}, { timestamps: true });

ActionTokenSchema.pre('findOne', function() {
    this.populate(dbModelsEnum.USER);
});

module.exports = model(dbModelsEnum.ACTION_TOKEN, ActionTokenSchema);

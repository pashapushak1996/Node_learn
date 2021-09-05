const { Schema, model } = require('mongoose');

const { dbModelsEnum, userRolesEnum } = require('../../constant');

const UserSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        select: false
    },
    role: {
        type: String,
        default: userRolesEnum.USER,
        enum: Object.values(userRolesEnum)
    }
}, { timestamps: true });

module.exports = model(dbModelsEnum.USER, UserSchema);

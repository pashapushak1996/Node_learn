const { Schema, model } = require('mongoose');

const { dbModelsEnum, userRolesEnum } = require('../../constant');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    age: {
        type: Number
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
    },
    isActivated: {
        type: Boolean,
        default: false
    },
    avatar: {
        type: String
    }
}, { timestamps: true });

module.exports = model(dbModelsEnum.USER, UserSchema);

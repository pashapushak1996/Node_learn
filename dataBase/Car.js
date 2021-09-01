const { Schema, model } = require('mongoose');

const { carColorsEnum, dbModelsEnum } = require('../constants');

const CarSchema = new Schema({
    producer: {
        type: String,
        required: true,
        trim: true
    },
    model: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: String,
        trim: true
    },
    year: {
        type: Number,
        trim: true
    },
    color: {
        type: String,
        trim: true,
        default: carColorsEnum.WHITE,
        colors: Object.values(carColorsEnum),
    }
}, { timestamps: true });

module.exports = model(dbModelsEnum.CAR, CarSchema);

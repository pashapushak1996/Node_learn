const { Schema, model } = require('mongoose');

const { dbModelsEnum } = require('../../constant');

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
    year: {
        type: Number,
        trim: true
    }
});

module.exports = model(dbModelsEnum.CAR, CarSchema);

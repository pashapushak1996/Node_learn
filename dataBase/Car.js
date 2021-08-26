const { Schema, model } = require('mongoose');

const CarSchema = new Schema({
    brand: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    model: {
        type: String,
        required: true,
        trim: true
    },
    year: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: String,
        trim: true
    }
});

module.exports = model('car', CarSchema);

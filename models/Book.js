const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Author', 
        required: true },
    year: {
        type: Number,
        required: true,
        min: 0
    },
    genre: {
        type: String,
        trim: true,
        default: ""
    },
    description: {
        type: String,
        trim: true,
        default: ""
    }
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        trim: true,
    },
    slug:{
        type: String,
        unique: true,
        trim: true,
        lowercase: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Category', categorySchema);
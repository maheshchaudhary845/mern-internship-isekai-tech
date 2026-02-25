const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true,
        maxlength: 30
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        index: true
    }
}, {timestamps: true})

module.exports = mongoose.model("Tag", tagSchema);
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        unique: true
    },
    content: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    image: {
        type: String,
        // required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    tags: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tag"
        }
    ],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

postSchema.index({ 
    slug: 1,
    category: 1,
    tags: 1
});

postSchema.virtual("comments", {
    ref: "Comment",
    localField: "_id",
    foreignField: "post",
    justOne: false
})

module.exports = mongoose.model("Post", postSchema);
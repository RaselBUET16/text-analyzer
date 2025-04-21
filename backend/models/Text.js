const mongoose = require('mongoose');

const TextSchema = new mongoose.Schema({
    content: {type: String, required: true},
    analysis: {
        type: {
            wordCount: Number,
            charCount: Number,
            sentenceCount: Number,
            paragraphCount: Number,
            longestWords: [[String]]
        },
        require: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: process.env.UserCollection || 'User',
        required: true
    }
}, {timestamps: true});

const TextModel = mongoose.model(
    process.env.TextCollection || "Text",
    TextSchema,
    process.env.TextCollection || "Text"
)

module.exports = TextModel;
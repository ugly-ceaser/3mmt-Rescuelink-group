const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
    responseType: {
        type: String,
        required: true,
        enum: ['fire', 'medical', 'crime']
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    votes: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Response', responseSchema);

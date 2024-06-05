const mongoose = require('mongoose');
const shortid = require('shortid');

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        default: shortid.generate
    },
    redirectURL: {
        type: String,
        required: true
    },
    visitHistory: {
        type: [Date],
        default: []
    }
}, { timestamps: true });

const URL = mongoose.model('URL', urlSchema);
module.exports = URL;

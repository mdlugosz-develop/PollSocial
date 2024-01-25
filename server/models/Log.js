const mongoose = require('mongoose');
const LogSchema = new mongoose.Schema({
    username: {
        type: String
    },
    type: {
        type: String,
        required: true
    }
    ,
    level: {
        type: String,
        required: true
    },
    timestampe: {
        type: Date,
        required: true,
        default: Date.now,
        expired: 604800,
    },
});

module.exports = mongoose.model("log", LogSchema);
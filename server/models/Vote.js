const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const voteSchema = new Schema({
    voter: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    pollId: {
        type: Schema.Types.ObjectId,
        ref: "Poll"
    },
    optionId: {
        type: Schema.Types.ObjectId,
        ref: "Poll"
    },
    votedAt: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model("Vote", voteSchema)
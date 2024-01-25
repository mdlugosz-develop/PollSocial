const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const pollSchema = new Schema({

    question: {
        type: String,
        required: true
    },
    options: [
        {
            optionText: {
                type: String,
                required: true,
            },
            votes: {
                type: Number,
                default: 0,
            },

        },
    ],
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
},
    {
        timestamps: true
    }

)

module.exports = mongoose.model("Poll", pollSchema)
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: true,

        },
        followers: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            },
        ],
        following: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            },
        ],
        bio: {
            type: String,
            default: "",

        },

        role: {
            type: String,
            enum: ["general", "moderator", "admin"],
            default: "general",

        },

        isEmailVerified: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.index({ name: "text" })
module.exports = mongoose.model("User", userSchema)
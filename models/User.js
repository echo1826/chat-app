const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
    username: {
        type: String,
        required: "Must have a username",
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: "Must have a password",
        trim: true,
        minLength: 8,
        match: [
            /^[a-z0-9A-Z]+$/,
            "Password can only conatin alphanumeric characters",
        ],
    },
    messages: [
        {
            type: Schema.Types.ObjectId,
            ref: "Message",
        },
    ],
});

userSchema.pre("save", async function (next) {
    if (this.isNew || this.isModified("password")) {
        const saltRounds = 12;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

const User = model("User", userSchema);

module.exports = User;

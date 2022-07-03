const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
        name: {type: String, require: true},
        email: {type: String, require: true, unique: true},
        password: {type: String, require: true},
        isAdmin: {type: String, default: "0", require: true},
    },
    {
        timestamps: true,
    }
)

const User = mongoose.model('User', userSchema);

module.exports = User;
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: {
        type: String,
        enum : ["student", "admin", "teacher"]
    }
});

module.exports = new mongoose.model("member", userSchema);
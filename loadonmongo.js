const mongoose = require("mongoose");
const crypto = require("crypto");
mongoose.connect('mongodb://localhost:27017/homework', {useNewUrlParser: true, useUnifiedTopology: true})

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: String,
});

const User = new mongoose.model("member", userSchema);

user = new User({
    username: "santosh",
    password: crypto.createHash('md5').update("hello").digest("hex"),
    role: "student",
});
user1 = new User({
    username: "rabin",
    password: crypto.createHash('md5').update("hello1").digest("hex"),
    role: "teacher"
});
user2 = new User({
    username: "dibas",
    password: crypto.createHash('md5').update("hello2").digest("hex"),
    role: "admin"
});

user.save();
user1.save();
user2.save();

// console.log(crypto.createHash('md5').update("santosh").digest("hex"));
// console.log(crypto.createHash('md5').update("santosh").digest("hex"));
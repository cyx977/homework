const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        validate: {
            validator: function(){
                return true;
            },
            message: "untrue asdasd"
        }
    }
});

const User = mongoose.model("user", userSchema);

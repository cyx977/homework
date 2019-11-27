const mongoose = require("mongoose");

async function main(){
    await mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        console.log("Connected");
    })
    .catch((err)=>{
        console.log("Could not Connect", err);
    });

    const  userSchema = mongoose.Schema({
        name: {
            required: true,
            type: String,
            validate: {
                validator: function(){
                    return false;
                },
                message: "custom validator"
            }        
        }
    });

    const User = mongoose.model("user", userSchema);

    const newUser = new User({
        name: "santosh"
    });

    newUser.save()
    .then((data)=>{
            console.log(data);
    })
    .catch(err => console.log(err.message));
}

main();


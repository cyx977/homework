//dependencies
const Joi               = require("joi");
const session           = require('express-session');
const crypto            = require("crypto");
const mongoose          = require("mongoose");

//establishing mongodb connection
mongoose.connect('mongodb://localhost:27017/homework', {useNewUrlParser: true, useUnifiedTopology: true});

const User = require("../models/user.js");

//schema for login
const schema = {
    username: Joi.string().min(3).required().alphanum(),
    password: Joi.string().min(3).required().alphanum(),
    role: Joi.string().min(5).required().alphanum()
};

//adds user info to the session if valid user
function loginRequest(req, res, next){
    async function login(){
        //read users from file
        // const users = require("../users.js");

        //read users from mongodb
        const users = await User.find();

        //validate user request
        Joi.validate(req.body, schema, (err, validData)=>{
            if(err == null){
                //check credentials
                const found = users.find((user)=>{
                    return (user.username == req.body.username && user.password == crypto.createHash('md5').update(req.body.password).digest("hex") && user.role == req.body.role);
                    //without crypto
                    // return (user.username == req.body.username && user.password == req.body.password && user.role == req.body.role);
                })
                if(found){
                    // make session
                    session.user = found;
                }
                else{
                    //dont make session
                    session.user= "unauthorised";
                }
            }
        } );       
        next();
    };
    login();
};

module.exports = loginRequest;
const express = require("express");
const session = require("express-session");
const router = express.Router();
const config                   = require("config");
const isAdminLoggedin = require("../middlewares/isadminloggedin");
const mongoose = require("mongoose");
const crypto = require("crypto");
const Joi               = require("joi");

//schema for registration
const schema = {
    username: Joi.string().min(3).required().alphanum(),
    password: Joi.string().min(3).required().alphanum(),
    role: Joi.string().min(5).required().alphanum()
};


const User = require("../models/userMongoose.js");


router.get("/", (req, res)=>{
    res.render("register");
});
router.post("/", (req, res)=>{
    Joi.validate(req.body, schema, (err, validData)=>{
        if(err){
            console.log(err);
        }else{
            user = new User({
                username: req.body.username,
                password: crypto.createHash('md5').update(req.body.password).digest("hex"),
                role: req.body.role,
            });
            user.save();
            res.send(`Successfully registered ${user.username}`);
        }
    });
});

module.exports = router;
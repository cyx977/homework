const express = require("express");
const session = require("express-session");
const router = express.Router();
const isadminloggedin = require("../middlewares/isadminloggedin.js");

router.get("/",isadminloggedin, (req, res)=>{
    // if(session.user == undefined){
    //     res.redirect("/");
    // }else if(session.user.role == "admin"){
        res.render("adminindex" ,{admin: session.user.username});
    // }else{
    //     res.status(401).send("Unauthorised");
    // }
});

router.get("/post",isadminloggedin, (req, res)=>{
    res.render("posthomework" ,{teacher: session.user.username});
});

router.get("/homeworks",isadminloggedin, (req, res)=>{
    res.send("not implemented yet");
});

module.exports = router;
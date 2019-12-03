const express = require("express");
const session = require("express-session");
const router = express.Router();
const isteacherloggedin = require("../middlewares/isteacherloggedin.js");


router.get("/",isteacherloggedin, (req, res)=>{
    if(session.user == undefined){
        res.redirect("/");
    }else if(session.user.role == "teacher"){
        res.render("teacherindex" ,{teacher: session.user.username});
    }else{
        res.status(401).send("Unauthorised");
    }
});

router.get("/post",isteacherloggedin, (req, res)=>{
    res.render("posthomework" ,{teacher: session.user.username});
});

router.get("/homeworks",isteacherloggedin, (req, res)=>{
    res.send("not implemented yet");
});


router.post("/post",isteacherloggedin, (req, res)=>{
    
});

module.exports = router;
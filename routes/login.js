const express = require("express");
const router = express.Router();
const session                  = require('express-session');

const loginMiddleware          = require("../middlewares/login");

//redirect to admin, teacher or student page
router.post("/",loginMiddleware , (req, res)=>{
    //check whether session.user is set
        if(session.user == undefined){
            res.status(404).send("Invalid Login Request");
        }else if(session.user == "unauthorised"){
            res.status(401).redirect("/");
        }else if(session.user.role == "student"){
            res.redirect("/student");
        }else if(session.user.role == "teacher"){
            res.redirect("/teacher");
        }else if(session.user.role == "admin"){
            res.redirect("/admin");
        }
});

module.exports = router;
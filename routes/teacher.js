const express = require("express");
const session = require("express-session");
const router = express.Router();
const isteacherloggedin = require("../middlewares/isteacherloggedin.js");
const mysql = require("../models/mysqlconnection");
const Joi               = require("joi");


router.get("/",isteacherloggedin, (req, res)=>{
        res.render("teacherindex" ,{teacher: session.user.username});
});

router.get("/post", (req, res)=>{
    const sql = "select * from batch";
    mysql.query(sql, (err, batch)=>{
        if(err){
            console.log(err);
            res.send("Error in Database");
        }else{
            res.render("posthomework" ,{data: batch});
        }
    })
});

router.post("/post", (req, res)=>{
    
});

router.get("/homeworks",isteacherloggedin, (req, res)=>{
    res.send("not implemented yet");
});

module.exports = router;
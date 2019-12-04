const express = require("express");
const session = require("express-session");
const router = express.Router();
const isstudentloggedin = require("../middlewares/isstudentloggedin.js");
const mysql = require("../models/mysqlconnection");


router.get("/",isstudentloggedin, (req, res)=>{
        res.render("studentindex" ,{student: session.user.username});
});

router.get("/homeworks",isstudentloggedin, (req, res)=>{
    const sql = `SELECT A.id, B.batch, A.Title, A.Deadline, A.Content, A.Teacher, A.Assigned_Date FROM homework AS A INNER join batch as B ON A.batch = B.id`;
    mysql.query(sql,(err, data)=>{
        if(err){
            console.log(err);
        }else{
            res.render("viewhomework", {data: data});
        }
    });
});


module.exports = router;
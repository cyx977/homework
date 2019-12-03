const express = require("express");
const session = require("express-session");
const router = express.Router();
const isteacherloggedin = require("../middlewares/isteacherloggedin.js");
const mysql = require("../models/mysqlconnection");
const Joi               = require("joi");

const homeworkSchema = {
    batch: Joi.number().required(),
    subject: Joi.number().required(),
    title: Joi.string().min(3).required(),
    deadline: Joi.string().required(),
    content: Joi.string().required().min(20)
}


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
            const sql = "select * from subjects";
            mysql.query(sql, (err, subjects)=>{
                if(err){
                    console.log(err);
                    res.send("Error in Database");
                }else{
                    res.render("posthomework" ,{batch: batch, subjects: subjects});
                }
            })
        }
    })
});

router.post("/post", (req, res)=>{
    Joi.validate(req.body, homeworkSchema, (err, validData)=>{
        if(err == null){
            const sql = `INSERT INTO homework (id, batch, Title, Deadline, Content, Teacher, Assigned_Date) VALUES (NULL, '${validData.batch}', '${validData.title}', '${validData.deadline}', '${validData.content}', '${session.user.username}', NOW())`;
            mysql.query(sql, (err, data)=>{
                if(err){
                    console.log(err);
                }else{
                    res.send(`Successfully Posted Homework , ${req.body.title}`);
                }
            });
        }else{
            console.log(err);
        }
    })
});

router.get("/homeworks", (req, res)=>{
    const sql = `SELECT A.id, B.batch, A.Title, A.Deadline, A.Content, A.Teacher, A.Assigned_Date FROM homework AS A INNER join batch as B ON A.batch = B.id`;
    mysql.query(sql,(err, data)=>{
        if(err){
            console.log(err);
        }else{
            res.render("viewhomework", {data: data});
        }
    });
});

router.get("/deletehomework/:id", (req, res)=>{
    const id = req.params.id;
    let sql = `delete from homework where id = ${id}`
    mysql.query(sql,(err, data)=>{
        if(err){
            console.log(err);
        }else{
            res.send(`Successfully deleted homework having id ${id}`);
        }
    })
});


module.exports = router;
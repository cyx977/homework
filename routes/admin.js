const express = require("express");
const session = require("express-session");
const router = express.Router();
const isadminloggedin = require("../middlewares/isadminloggedin.js");
const mysql = require("../models/mysqlconnection");
const Joi               = require("joi");

//schema for register
const batchSchema = {
    batch: Joi.string().min(3).required(),
};

const subjectSchema = {
    subjectname: Joi.string().min(3).required(),
    subjectcode: Joi.string().min(3).required(),
};


router.get("/",isadminloggedin, (req, res)=>{
        res.render("adminindex" ,{admin: session.user.username});
});

router.get("/addbatch", (req, res)=>{
    const sql = "select * from batch";
    mysql.query(sql, (err, data)=>{
        if(err){
            console.log(err);
            res.send("Error in Database");
        }else{
            res.render("addbatch" ,{admin: "session.user.username", data: data});
        }
    })
    
});



router.post("/addbatch", (req, res)=>{
    Joi.validate(req.body, batchSchema, (err, validData)=>{
        if(err == null){
            const sql = `INSERT INTO batch (id, batch) VALUES (NULL, '${req.body.batch}')`;
            mysql.query(sql, (err, data)=>{
                if(err){
                    console.log(err);
                }else{
                    res.send(`Successfully Registered batch, ${req.body.batch}`);
                }
            });
        }else{
            console.log(err);
        }
    })
});


router.get("/adduser",isadminloggedin, (req, res)=>{
    res.render("adduser");
});
router.post("/adduser",isadminloggedin, (req, res)=>{
    res.render("adduser");
});

router.get("/subject", (req, res)=>{
    const sql = "select * from subjects";
    mysql.query(sql, (err, data)=>{
        if(err){
            console.log(err);
            res.send("Error in Database");
        }else{
            res.render("subject" ,{admin: "session.user.username", data: data});
        }
    })
});

router.post("/addsubject", (req, res)=>{
    Joi.validate(req.body, subjectSchema, (err, validData)=>{
        if(err == null){
            const sql = `INSERT INTO subjects (id, Subject_Name, Subject_Code) VALUES (NULL, '${req.body.subjectname}', '${req.body.subjectcode}')`;
            mysql.query(sql, (err, data)=>{
                if(err){
                    console.log(err);
                }else{
                    res.send(`Successfully Registered batch, ${req.body.subjectname}`);
                }
            });
        }else{
            console.log(err);
        }
    })
});

router.get("/deletebatch/:id", (req, res)=>{
    const id = req.params.id;
    let sql = `delete from batch where id = ${id}`
    mysql.query(sql,(err, data)=>{
        if(err){
            console.log(err);
        }else{
            res.send(`Successfully deleted batch having id ${id}`);
        }
    })
});
router.get("/deletesubject/:id", (req, res)=>{
    const id = req.params.id;
    let sql = `delete from subjects where id = ${id}`
    mysql.query(sql,(err, data)=>{
        if(err){
            console.log(err);
        }else{
            res.send(`Successfully deleted subject having id ${id}`);
        }
    })
});

module.exports = router;
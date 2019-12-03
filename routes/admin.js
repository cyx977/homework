const express = require("express");
const session = require("express-session");
const router = express.Router();
const isadminloggedin = require("../middlewares/isadminloggedin.js");
const mysql = require("../models/mysqlconnection");
const Joi               = require("joi");

//schema for register
const schema = {
    batch: Joi.string().min(3).required(),
};


router.get("/",isadminloggedin, (req, res)=>{
        res.render("adminindex" ,{admin: session.user.username});
});

router.get("/addbatch", (req, res)=>{
    const sql = "select * from batches";
    mysql.query(sql, (err, data)=>{
        if(err){
            console.log(err);
            res.send("Error in Database");
        }else{
            res.render("addbatch" ,{admin: "session.user.username", data: data});
        }
    })
    
});

router.get("/delete/:id", (req, res)=>{
    const id = req.params.id;
    let sql = `delete from batches where id = ${id}`
    mysql.query(sql,(err, data)=>{
        if(err){
            console.log(err);
        }else{
            res.send(`Successfully Deleted batch having id ${id}`)
        }
    })
});
router.post("/addbatch", (req, res)=>{
    Joi.validate(req.body, schema, (err, validData)=>{
        if(err == null){
            const sql = `INSERT INTO batches (id, batch) VALUES (NULL, '${req.body.batch}')`;
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
    res.send("not implemented yet");
});

router.get("/subject",isadminloggedin, (req, res)=>{
    res.send("not implemented yet");
});

module.exports = router;
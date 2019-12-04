const express = require("express");
const nodemailer = require("nodemailer");
const session = require("express-session");
const router = express.Router();
const isadminloggedin = require("../middlewares/isadminloggedin.js");
const mysql = require("../models/mysqlconnection");
const Joi               = require("joi");
const fs = require("fs");
const fsPromises = require("fs").promises;
const fileUpload = require("express-fileupload");

var student                      = require("../models/students.js"),
    teacher                      = require("../models/teacher.js"),
    subject                      = require("../models/subject.js");

//schema for register
const batchSchema = {
    batch: Joi.string().min(3).required(),
};

const subjectSchema = {
    subjectname: Joi.string().min(3).required(),
    subjectcode: Joi.string().min(3).required().alphanum(),
};


router.get("/mail",isadminloggedin, (req, res)=>{
    res.render("sendmail", {admin: session.user.username, teacher: teacher, subject: subject});
});

router.post("/mail",isadminloggedin, async (req, res)=>{
    //create mailer transport object
    if(req.body.password != "bit_cit_2017"){
        //delete uploaded file 
        fs.unlink(`${req.files.getfile.tempFilePath}`, (err)=>{
            console.log("Deleted file");
        });
        //return invalid password
        return res.status(401).send("Invalid Password");
    }
    const mailer = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'lc@cit.edu.np',
          pass: 'club@1213'
        }
    });
     //populate mailList
     var mailList = new Array();
     student.forEach(student => {
         mailList.push(student.email);
     });

    //rename the file
    await fs.rename(`${req.files.getfile.tempFilePath}`, `uploads/${req.files.getfile.name}`, (err)=>{
        if(err){
            console.log("Problem with File Stream");
            //delete the file
            fs.unlink(`uploads/${req.files.getfile.name}`, (err)=>{
                res.send(`${req.files.getfile.name} after problem in the file stream`);
            });
        }else{
            //send email
            mailer.sendMail({
                // bcc: mailList,
                bcc: "cyx977@gmail.com",
                subject: req.body.subject,
                text: req.body.text + `\nSent By\n${req.body.teacher}` + `\nSubject Code : ${req.body.subjectcode}`,
                attachments: {
                    path: `uploads/${req.files.getfile.name}`
                }
            })
            . then( success =>{
                //delete the file
                fs.unlink(`uploads/${req.files.getfile.name}`, (err)=>{
                    res.send(`${req.files.getfile.name} sent emails to ${success.envelope.to} batch: ${req.body.batch}`);
                });
                console.log(success);
            })
            .catch((err)=>{
                //delete the file
                fs.unlink(`uploads/${req.files.getfile.name}`, (err)=>{
                    res.send(`${req.files.getfile.name} couldnot send emails`);
                });
                console.log(err);
            });
        }
    })
});


router.get("/",isadminloggedin, (req, res)=>{
        res.render("adminindex" ,{admin: session.user.username});
});

router.get("/addbatch",isadminloggedin, (req, res)=>{
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



router.post("/addbatch",isadminloggedin, (req, res)=>{
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
    res.render("adduser", {admin: session.user.username});
});
router.post("/adduser",isadminloggedin, (req, res)=>{
    res.render("adduser", {admin: session.user.username});
});

router.get("/subject",isadminloggedin, (req, res)=>{
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

router.post("/addsubject",isadminloggedin, (req, res)=>{
    Joi.validate(req.body, subjectSchema, (err, validData)=>{
        if(err == null){
            const sql = `INSERT INTO subjects (id, Subject_Name, Subject_Code) VALUES (NULL, '${req.body.subjectname}', '${req.body.subjectcode}')`;
            mysql.query(sql, (err, data)=>{
                if(err){
                    console.log(err);
                }else{
                    fs.mkdir(`uploads/${req.body.subjectcode}/`,{ recursive: true }, (err)=>{
                        if(err){
                            console.log(err);
                        }
                    });
                    res.send(`Successfully Registered batch, ${req.body.subjectname}`);
                }
            });
        }else{
            console.log(err);
        }
    })
});

router.get("/deletesubject/:id",isadminloggedin, (req, res)=>{
    const id = req.params.id;
    let sql = `delete from subjects where id = ${id}`
    let sql1 = `select Subject_Code from subjects where id = ${id}`
    mysql.query(sql1,(err, dataF)=>{
        if(err){
            console.log(err);
        }else{
            mysql.query(sql,(err, data)=>{
                if(err){
                    console.log(err);
                }else{
                    fsPromises.rmdir(`uploads/${dataF[0].Subject_Code}`)
                    .then(()=>{
                        res.send(`Successfully deleted subject having id ${id}`);
                    })
                    .catch(err=>{
                        console.log(err);
                    });   
                }
            })
        }
    });
    
    
});

router.get("/deletebatch/:id",isadminloggedin, (req, res)=>{
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

module.exports = router;
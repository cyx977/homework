const express = require("express");
const session = require("express-session");
const router = express.Router();
const isstudentloggedin = require("../middlewares/isstudentloggedin.js");


router.get("/",isstudentloggedin, (req, res)=>{
        res.render("studentindex" ,{student: session.user.username});
});

router.get("/homeworks",isstudentloggedin, (req, res)=>{
    res.send("not implemented yet");
});


module.exports = router;
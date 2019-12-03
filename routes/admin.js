const express = require("express");
const session = require("express-session");
const router = express.Router();
const isadminloggedin = require("../middlewares/isadminloggedin.js");

router.get("/",isadminloggedin, (req, res)=>{
        res.render("adminindex" ,{admin: session.user.username});
});

router.get("/post",isadminloggedin, (req, res)=>{
    res.render("posthomework" ,{admin: session.user.username});
});

router.get("/homeworks",isadminloggedin, (req, res)=>{
    res.send("not implemented yet");
});

module.exports = router;
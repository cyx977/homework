const express = require("express");
const session = require("express-session");
const router = express.Router();

router.get("/", (req, res)=>{
    if(session.user == undefined){
        res.redirect("/");
    }else if(session.user.role == "teacher"){
        res.render("teacherindex" ,{teacher: session.user.username});
    }else{
        res.status(401).send("Unauthorised");
    }
});

router.get("/post", (req, res)=>{
    res.render("posthomework" ,{teacher: session.user.username});
});

router.get("/homeworks", (req, res)=>{
    res.send("not implemented yet");
});


router.post("/post", (req, res)=>{
    
});

module.exports = router;
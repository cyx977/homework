const express = require("express");
const session = require("express-session");
const router = express.Router();

router.get("/", (req, res)=>{
    if(session.user == undefined){
        res.redirect("/");
    }else if(session.user.role == "student"){
        res.render("studentindex" ,{student: session.user.username});
    }else{
        res.status(401).send("Unauthorised");
    }
});

router.get("/homeworks", (req, res)=>{
    res.send("not implemented yet");
});


module.exports = router;
const express = require("express");
const session = require("express-session");
const router = express.Router();

router.get("/", (req, res)=>{
    if(session.user == undefined){
        res.redirect("/");
    }else if(session.user.role == "admin"){
        res.send(session.user);
    }else{
        res.status(401).send("Unauthorised");
    }
});

module.exports = router;
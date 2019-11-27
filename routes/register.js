const express = require("express");
const session = require("express-session");
const router = express.Router();
const config                   = require("config");


router.get("/", (req, res)=>{
    res.render("register.ejs", {projectName: config.get("projectName")});
});


router.post("/", (req, res)=>{
    res.send("Registration Closed");
});

module.exports = router;
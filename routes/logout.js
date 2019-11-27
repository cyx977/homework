const express = require("express");
const router = express.Router();
const session = require("express-session");

router.get("/", (req, res)=>{
    session.user = "unauthorised";
    res.redirect("/");
});

module.exports = router;
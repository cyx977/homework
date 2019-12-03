const session = require("express-session");
function isadminloggedin(req, res, next){
    if(session.user == undefined){
        res.redirect("/");
    }else if(session.user.role == "teacher"){
        return next();
    }else{
        res.status(401).send("Unauthorised");
    }
}

module.exports = isadminloggedin;
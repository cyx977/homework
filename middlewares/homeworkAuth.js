const session = require("express-session");
function isadminloggedin(req, res, next){
    if(session.user == undefined){
        res.redirect("/");
    }else if(session.user.role == "admin" || session.user.role == "teacher" || session.user.role == "student" ){
        return next();
    }else{
        res.status(401).send("Unauthorised");
    }
}

module.exports = isadminloggedin;
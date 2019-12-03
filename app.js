//dependencies
let express                      = require("express"),
    config                       = require("config"),
    session                      = require('express-session'),
    login                        = require("./routes/login"),
    adminArea                    = require("./routes/admin"),
    studentArea                  = require("./routes/student"),
    teacherArea                  = require("./routes/teacher"),
    registration                 = require("./routes/register"),
    mysqlConnection              = require("./models/mysqlconnection"),
    logout                       = require("./routes/logout");

//application object
const app                      = express();

//app configurations
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));

//session config
app.use(session({
    name: "homework",
    secret: '#$%^$#wiseMenShould(!do)HomeWork@NEPAL#$%^$#',
    resave: false,
    saveUninitialized: false,
    cookie: {expires: 1000 * 60 }
}));

//routes
app.use("/login", login);
app.use("/logout", logout);
app.use("/admin", adminArea);
app.use("/teacher", teacherArea);
app.use("/student", studentArea);
app.use("/register", registration);


app.get("/", (req,res)=>{
    res.render("index", {projectName: config.get("projectName")});
});


app.post("/", (req, res)=>{
    res.send("heheheheh");
});


//express listen
app.listen(config.get("portNum")/*process.env.PORT */, ()=>{
    console.log(`${config.get("projectName")} Server started at port ${config.get("portNum")}`);
});
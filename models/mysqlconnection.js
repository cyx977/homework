var mysql                      = require('mysql');
const config                   = require("config");

var connection = mysql.createConnection({
    user     : config.get("user"),
    password : config.get("password"),
    host     : config.get("host"),
    database : config.get("database")
  });

module.exports = connection;
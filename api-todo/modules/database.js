var mysql = require('mysql');

module.exports = mysql.createConnection({
    host: "localhost",
    user: "knaek",
    password: "******",
    database: "todo"
});
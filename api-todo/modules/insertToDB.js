var con = require('./database');
var mysql = require('mysql');

const insertToDB = (title, description, user) => {
    return new Promise((resolve, reject) => {
        con.query("INSERT INTO List (title, description, user) VALUES (" + mysql.escape(title) + ", " + mysql.escape(description) + ", " + mysql.escape(user) + ")", function (err, result) {
            if (err) { 
                reject(err);
            }
            resolve(result);
            console.log("Added \"" + title + "\" to the list");
        });
    });
};

module.exports = insertToDB;
var con = require('./database');
var mysql = require('mysql');

const updateStatusDB = (id, title) => {
    return new Promise((resolve, reject) => {
        con.query("UPDATE List SET status = !status WHERE id = " +  + mysql.escape(id), function (err, result, fields) {
            if (err) { 
                reject(err);
            }
            resolve(id);
            console.log("Updated status of \"" + title + "\"");
        });
    });
};

module.exports = updateStatusDB;
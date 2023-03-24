var con = require('./database');
var mysql = require('mysql');

const deleteFromDB = (id, title) => {
    return new Promise((resolve, reject) => {
        con.query("DELETE from List WHERE id = " + mysql.escape(id), function (err, result) {
            if (err) { 
                reject(err);
            }
            resolve(id);
            console.log("Deleted \"" + title + "\" from the list");
        });
    });
};

module.exports = deleteFromDB;
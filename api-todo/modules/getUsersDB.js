var con = require('./database');

const getActiveDB = () => {
    return new Promise((resolve, reject) => {
        con.query("SELECT * FROM Users ORDER BY name ASC ", function (err, result, fields) {
            if (err) { 
                reject(err);
            }
            resolve(result);
            console.log("Got the users");
        });
    });
};

module.exports = getActiveDB;
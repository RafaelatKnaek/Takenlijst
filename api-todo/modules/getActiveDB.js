var con = require('./database');

const getActiveDB = () => {
    return new Promise((resolve, reject) => {
        con.query("SELECT List.id, List.title, List.description, List.status, Users.name AS name FROM List LEFT JOIN Users ON List.user = Users.id ORDER BY status ASC, title ASC ", function (err, result, fields) {
            if (err) { 
                reject(err);
            }
            resolve(result);
            console.log("Got the list");
        });
    });
};

module.exports = getActiveDB;
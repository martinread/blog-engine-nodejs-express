var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('blog-database.db');

module.exports.getCredentials = function ({username: username, password: password }, callback) {
    db.all("SELECT username, password FROM Users WHERE username = ? AND password = ?", [username, password], function (err, rows) {
        if (rows.length > 0) {
            callback(rows[0]);
        } else {
            callback(null);
        }
    });
};

module.exports.getUserInfo = function (username, callback) {
    db.all("SELECT * FROM Users WHERE username = ?", [username], function (err, rows) {
        if (rows.length > 0) {
            callback(rows[0]);
        } else {
            callback(null);
        }
    });
};
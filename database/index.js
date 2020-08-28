
const mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.DB_password,
    database: process.env.DB_database,
    charset: "utf8mb4",
    encoding: "utf8mb4_unicode_520_ci",
    acquireTimeout: 1000000
});

module.exports = con;
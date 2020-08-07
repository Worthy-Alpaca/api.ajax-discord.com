
const mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.DB_password,
    database: process.env.DB_database
});

module.exports = con;
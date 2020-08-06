const express = require('express');
const app = express();

//Import Routes
const authRoute = require('./routes/auth');

//import and setup database
const mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: password,
    database: database
});

con.connect(err => {
    if (err) throw err;
    console.log("Connected to Database");
    con.query("CREATE TABLE IF NOT EXISTS login(server_id TEXT NOT NULL, password TEXT NOT NULL);");
})

//Route Middlewares
app.use('/api/user', authRoute)

app.listen(5000, () => console.log('Server running on port 5000'));
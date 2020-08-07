const express = require('express');
const app = express();
const helmet = require("helmet");
var cookieParser = require('cookie-parser');
var bodyParser = require("body-parser");
const exjwt = require('express-jwt');

//.env Import
require('dotenv').config();


//Import Routes
const authRoute = require('./routes/auth');
const dashboardRoute = require('./routes/dashboard');
const verifyRoute = require('./routes/verify');

//Import database connection
const con = require('./database/index');

con.connect(err => {
    if (err) throw err;
    console.log("Connected to Database");
    con.query("CREATE TABLE IF NOT EXISTS login(server_id VARCHAR(255) NOT NULL UNIQUE, password TEXT NOT NULL);");
})

//Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*')
    next();
});

//express jsonwebtoken middleware
const jwtMW = exjwt({
    secret: process.env.TOKEN_SECRET
});

//using express jsonwebtoke
app.get('/', jwtMW, (req, res) => {
    console.log("Web Token Checked.")
    res.send('You are authenticated'); //Sending some response when authenticated
});

//Route Middlewares
app.use('/user', authRoute);
app.use('/dashboard', dashboardRoute);
app.use('/verify', verifyRoute);

app.listen(5000, () => console.log('Server running on port 5000'));
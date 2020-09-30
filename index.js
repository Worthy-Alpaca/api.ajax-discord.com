const express = require('express');
const app = express();
const helmet = require("helmet");
var cookieParser = require('cookie-parser');
var bodyParser = require("body-parser");
const exjwt = require('express-jwt');
const jwt = require('jsonwebtoken');

//.env Import
/* require('dotenv').config(); */
require('dotenv').config({ path: __dirname + '/.env' });

//Import attributes from package.json
const { name, version } = require('./package.json');


//Import Routes
const authRoute = require('./routes/auth');
const dashboardRoute = require('./routes/dashboard');
const verifyRoute = require('./routes/verify');
const showserver = require('./routes/discord/discord');
const channels = require('./routes/discord/channels');
const roles = require('./routes/discord/roles');
const misc = require('./routes/discord/misc');
const commands = require('./routes/discord/commands');
const server = require('./routes/website/server');

//Import database connection
/* const con = require('./database/index');

con.connect(err => {
    if (err) console.log(err);
    console.log("Connected to Database");
    con.query("CREATE TABLE IF NOT EXISTS servers(id VARCHAR(20) NOT NULL UNIQUE, name TEXT NOT NULL, admin TEXT, moderator TEXT, greeting VARCHAR(512), channel TEXT, approved TEXT, startcmd TEXT, reports TEXT, auto_approved TEXT, server_greeting TEXT, prefix TEXT) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_general_ci;")
    con.query("CREATE TABLE IF NOT EXISTS ranks(rank_id VARCHAR(20) NOT NULL UNIQUE, server_id VARCHAR(20) NOT NULL, rank_name TEXT NOT NULL);")
    con.query("CREATE TABLE IF NOT EXISTS login(server_id VARCHAR(255) NOT NULL UNIQUE, password TEXT NOT NULL);");
    con.query("CREATE TABLE IF NOT EXISTS channels(server_id VARCHAR(255) NOT NULL, channel_id VARCHAR(255) NOT NULL UNIQUE, channel_name TEXT NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_general_ci;");
    con.query("CREATE TABLE IF NOT EXISTS roles(server_id VARCHAR(255) NOT NULL, role_id VARCHAR(255) NOT NULL UNIQUE, role_name TEXT NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_general_ci;");
    con.query("CREATE TABLE IF NOT EXISTS commands(name VARCHAR(512) NOT NULL, category VARCHAR(512) NOT NULL, description VARCHAR(1024) NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_general_ci;");
}) */

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
const jwtMW = function (req, res, next) {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(400).json({
            error: 'You need an access token!'
        })
    }
    //console.log("verify");
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch {
        res.status(400).send('Invalid Token!!');
    }
}

//using express jsonwebtoke
app.get('/', jwtMW, (req, res) => {
    console.log(req.user)
    const headers = req.headers;
    res.status(200).json({        
        Data: {
            name,
            version
        },
        headers
    })
});

//Route Middlewares
app.use('/user', authRoute);
app.use('/dashboard', dashboardRoute);
app.use('/verify', verifyRoute);
app.use('/discord', showserver);
app.use('/discord/channel', channels);
app.use('/discord/role', roles);
app.use('/discord/misc', misc);
app.use('/discord/commands', commands);
app.use('/website', server);

app.listen(process.env.PORT || 5000, () => console.log('Server running on port 5000'));
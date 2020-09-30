
const mysql = require('mysql');

/* var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.DB_password,
    database: process.env.DB_database,
    charset: "utf8mb4",
    encoding: "utf8mb4_unicode_520_ci",
    acquireTimeout: 1000000
}); */

var db_config = {
    host: "localhost",
    user: "root",
    password: process.env.DB_password,
    database: process.env.DB_database,
    charset: "utf8mb4",
    encoding: "utf8mb4_unicode_520_ci",
    acquireTimeout: 1000000
};

/* var con;

function handleDisconnect() {
    con = mysql.createConnection(db_config); // Recreate the connection, since
    // the old one cannot be reused.

    con.connect(function (err) {              // The server is either down
        if (err) {                                     // or restarting (takes a while sometimes).
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect(), 2000); // We introduce a delay before attempting to reconnect,
        }                                     // to avoid a hot loop, and to allow our node script to
                                            // process asynchronous requests in the meantime.
        console.log("Connected to Database");

        //Check if all neccessary tables exist
        con.query("CREATE TABLE IF NOT EXISTS servers(id VARCHAR(20) NOT NULL UNIQUE, name TEXT NOT NULL, admin TEXT, moderator TEXT, greeting VARCHAR(512), channel TEXT, approved TEXT, startcmd TEXT, reports TEXT, auto_approved TEXT, server_greeting TEXT, prefix TEXT, kick_limit INT, ban_limit INT) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_general_ci;")
        con.query("CREATE TABLE IF NOT EXISTS ranks(rank_id VARCHAR(20) NOT NULL UNIQUE, server_id VARCHAR(20) NOT NULL, rank_name TEXT NOT NULL);")
        con.query("CREATE TABLE IF NOT EXISTS login(server_id VARCHAR(255) NOT NULL UNIQUE, password TEXT NOT NULL);");
        con.query("CREATE TABLE IF NOT EXISTS channels(server_id VARCHAR(255) NOT NULL, channel_id VARCHAR(255) NOT NULL UNIQUE, channel_name TEXT NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_general_ci;");
        con.query("CREATE TABLE IF NOT EXISTS roles(server_id VARCHAR(255) NOT NULL, role_id VARCHAR(255) NOT NULL UNIQUE, role_name TEXT NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_general_ci;");
        con.query("CREATE TABLE IF NOT EXISTS commands(name VARCHAR(512) NOT NULL, category VARCHAR(512) NOT NULL, description VARCHAR(1024) NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_general_ci;");
    });
    // If you're also serving http, display a 503 error.
    con.on('error', function (err) {
        console.log('db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
            handleDisconnect();                         // lost due to either server restart, or a
        } else {                                      // connnection idle timeout (the wait_timeout
            throw err;                                  // server variable configures this)
        }
    });
}

handleDisconnect(); */

var con = mysql.createPool(db_config);

con.getConnection(function (err, con) {
    if (err) {
        connection.release();
        console.log(' Error getting mysql_pool connection: ' + err);
        throw err;
    }
    con.query("CREATE TABLE IF NOT EXISTS servers(id VARCHAR(20) NOT NULL UNIQUE, name TEXT NOT NULL, admin TEXT, moderator TEXT, greeting VARCHAR(512), channel TEXT, approved TEXT, startcmd TEXT, reports TEXT, auto_approved TEXT, server_greeting TEXT, prefix TEXT, kick_limit INT, ban_limit INT) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_general_ci;")
    con.query("CREATE TABLE IF NOT EXISTS ranks(rank_id VARCHAR(20) NOT NULL UNIQUE, server_id VARCHAR(20) NOT NULL, rank_name TEXT NOT NULL);")
    con.query("CREATE TABLE IF NOT EXISTS login(server_id VARCHAR(255) NOT NULL UNIQUE, password TEXT NOT NULL);");
    con.query("CREATE TABLE IF NOT EXISTS channels(server_id VARCHAR(255) NOT NULL, channel_id VARCHAR(255) NOT NULL UNIQUE, channel_name TEXT NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_general_ci;");
    con.query("CREATE TABLE IF NOT EXISTS roles(server_id VARCHAR(255) NOT NULL, role_id VARCHAR(255) NOT NULL UNIQUE, role_name TEXT NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_general_ci;");
    con.query("CREATE TABLE IF NOT EXISTS commands(name VARCHAR(512) NOT NULL, category VARCHAR(512) NOT NULL, description VARCHAR(1024) NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_general_ci;");
    console.log("Connected to Database");
})

module.exports = con;
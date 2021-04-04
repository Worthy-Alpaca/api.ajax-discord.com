
const mysql = require('mysql');

var db_config = {
	host: 'localhost',
	user: 'root',
	password: process.env.DB_password,
	database: process.env.DB_database,
	charset: 'utf8mb4',
	encoding: 'utf8mb4_unicode_520_ci',
	acquireTimeout: 1000000
};

var con = mysql.createPool(db_config);

con.getConnection(function (err, con) {
	if (err) {
		con.release();
		console.log(' Error getting mysql_pool connection: ' + err);
		throw err;
	}
	con.query('CREATE TABLE IF NOT EXISTS servers(id VARCHAR(20) NOT NULL UNIQUE, name TEXT NOT NULL, admin TEXT, moderator TEXT, greeting VARCHAR(512), channel TEXT, approved TEXT, startcmd TEXT, reports TEXT, auto_approved TEXT, server_greeting TEXT, prefix VARCHAR(10) DEFAULT \'!\', kick_limit INT, ban_limit INT, togglegreeting VARCHAR(50) DEFAULT \'false\') ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_general_ci;');
	con.query('CREATE TABLE IF NOT EXISTS ranks(rank_id VARCHAR(20) NOT NULL UNIQUE, server_id VARCHAR(20) NOT NULL, rank_name TEXT NOT NULL);');
	con.query('CREATE TABLE IF NOT EXISTS login(server_id VARCHAR(255) NOT NULL UNIQUE, password TEXT NOT NULL);');
	con.query('CREATE TABLE IF NOT EXISTS channels(server_id VARCHAR(255) NOT NULL, channel_id VARCHAR(255) NOT NULL UNIQUE, channel_name TEXT NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_general_ci;');
	con.query('CREATE TABLE IF NOT EXISTS roles(server_id VARCHAR(255) NOT NULL, role_id VARCHAR(255) NOT NULL UNIQUE, role_name TEXT NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_general_ci;');
	con.query('CREATE TABLE IF NOT EXISTS commands(name VARCHAR(512) NOT NULL, category VARCHAR(512) NOT NULL, description VARCHAR(1024) NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_general_ci;');
	con.query('CREATE TABLE IF NOT EXISTS coc(server_id VARCHAR(20) NOT NULL, coc TEXT NOT NULL, id INT NOT NULL UNIQUE AUTO_INCREMENT)');
	console.log('Connected to Database');
});

module.exports = con;
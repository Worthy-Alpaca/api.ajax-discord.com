const con = require('./index');

module.exports = {
    getcurrentserver: function(server_id) {
        return new Promise(function (resolve, reject) {
            con.query('SELECT * FROM servers WHERE id = ?', [server_id], function (error, results, fields) {

                if (results.length = 1) {
                    //console.log(results[0])
                    resolve(results[0])
                } else {
                    res.json({
                        error: 'No user found'
                    })
                }                
            });
        })
    },

    getchannels: function (server_id) {
        return new Promise(function (resolve, reject) {
            con.query('SELECT * FROM channels WHERE server_id = ?', [server_id], function (error, results, fields) {
                resolve(results);
            });
        })
    },

    addchannel: function (channel, guild) {
        return new Promise(function(resolve, reject) {
            con.query(`SELECT * FROM channels WHERE server_id = '${guild.id}' AND channel_id = '${channel.id}'`, (err, rows) => {
                if (err) throw err;
                let sql;

                if (!rows.length) {
                    console.log(channel.name, "added")
                    sql = `INSERT INTO channels (server_id, channel_id, channel_name) VALUES ('${guild.id}', "${channel.id}", "${channel.name}")`
                    try {
                        con.query(sql);
                        return resolve(true);
                    } catch (err) {
                        return resolve(err);
                    }
                }

            });
        })
    },

    delchannel: function (channel, guild) {
        return new Promise(function (resolve, reject) {
            con.query(`SELECT * FROM channels WHERE channel_name = '${channel.name}' AND channel_id = '${channel.id}'`, (err, rows) => {
                if (rows.length === 1) {
                    let sql = `DELETE FROM channels WHERE channel_name = '${channel.name}' AND channel_id = '${channel.id}'`
                    try {
                        con.query(sql);
                        return resolve(true);
                    } catch (err) {
                        return resolve(err);
                    }
                }
            });
        })
    },

    updatechannel: function (newChannel, guild) {
        return new Promise(function (resolve, reject) {
            con.query(`SELECT * FROM channels WHERE server_id = '${guild.id}' AND channel_id = '${newChannel.id}'`, (err, rows) => {
                if (err) throw err;
                let sql;

                if (rows.length === 1) {
                    if (rows[0].channel_name !== newChannel.name) {                        
                        sql = `UPDATE channels SET channel_name = '${newChannel.name}' WHERE channel_id = '${newChannel.id}'`
                        try {
                            con.query(sql);
                            return resolve(true);
                        } catch (error) {
                            return resolve(error);
                        }
                    } else {
                        return resolve(false);
                    }
                } else return resolve(false);

            });
        })
    },

    addrole: function (role, guild) {
        return new Promise(function (resolve, reject) {
            con.query(`SELECT * FROM roles WHERE server_id = '${guild.id}' AND role_id = '${role.id}'`, (err, rows) => {
                if (err) throw err;
                let sql;

                if (!rows.length) {                    
                    sql = `INSERT INTO roles (server_id, role_id, role_name) VALUES ('${guild.id}', "${role.id}", "${role.name}")`
                    try {
                        con.query(sql);
                        return resolve(true);
                    } catch (error) {
                        return resolve(false);
                    }
                }

            });
        })
    },

    delrole: function (role, guild) {
        return new Promise(function (resolve, reject) {
            con.query(`SELECT * FROM roles WHERE role_name = '${role.name}' AND role_id = '${role.id}'`, (err, rows) => {
                if (rows.length === 1) {
                    let sql = `DELETE FROM roles WHERE role_name = '${role.name}' AND role_id = '${role.id}'`
                    try {
                        con.query(sql);
                        return resolve(true);
                    } catch (error) {
                        return resolve(false);
                    }
                } else {
                    return resolve(false);
                }
            });
        })
    },

    updaterole: function (newRole, guild) {
        return new Promise(function (resolve, reject) {
            con.query(`SELECT * FROM roles WHERE server_id = '${guild.id}' AND role_id = '${newRole.id}'`, (err, rows) => {
                if (err) throw err;
                let sql;

                if (rows.length === 1) {
                    if (rows[0].role_name !== newRole.name) {
                        sql = `UPDATE roles SET role_name = '${newRole.name}' WHERE role_id = '${newRole.id}'`
                        try {
                            con.query(sql);
                            return resolve(true);
                        } catch (error) {
                            return resolve(false);
                        }
                    } else {
                        return resolve('Name not changed');
                    }
                } else {
                    return;
                }

            })
        })
    },

    newServer: function (guild) {
        return new Promise(function (resolve, reject) {
            con.query(`SELECT * FROM servers WHERE id = '${guild.id}'`, (err, rows) => {
                if (err) throw err;
                let sql;

                if (!rows.length) {
                    console.log(guild.name, "added")
                    sql = `INSERT INTO servers (id, name) VALUES ('${guild.id}', "${guild.name}")`
                    
                    try {
                        con.query(sql);
                        return resolve(true);
                    } catch (error) {
                        return resolve(false);
                    }
                } else {
                    return resolve(false)
                }

            });
        })
    },

    deleteServer1: function (guild) {
        return new Promise(function (resolve, reject) {
            con.query(`SELECT * FROM servers WHERE id = '${guild.id}'`, (err, rows) => {

                let sql = `DELETE FROM servers WHERE id = '${guild.id}'`
                try {
                    con.query(sql);
                    return resolve(true);
                } catch (error) {
                    return resolve(false);
                }
            })
        })
    },

    deleteServer2: function (guild) {
        return new Promise(function (resolve, reject) {            
            con.query(`SELECT * FROM login WHERE server_id = '${guild.id}'`, (err, rows) => {
                let sql = `DELETE FROM login WHERE server_id = '${guild.id}'`
                try {
                    con.query(sql);
                    return resolve(true);
                } catch (error) {
                    return resolve(false);
                }
            })
        })
    },

    setServer: function (guild, field, value) {
        return new Promise(function (resolve, reject) {
            con.query(`SELECT * FROM servers WHERE id = '${guild.id}'`, (err, rows) => {
                let sql;
                sql = `UPDATE servers SET ${field} = '${value}' WHERE id = '${guild.id}'`;
                adm = true;
                try {
                    con.query(sql);
                    return resolve(true);
                } catch (error) {
                    return resolve(error);
                }
            })
        })
    },

    addreddit: function (guild, reddit) {
        var sql;
        return new Promise(function (resolve, reject) {
            con.query(`SELECT * FROM reddits WHERE server_id = '${guild.id}' AND reddit = '${reddit}'`, (err, rows) => {
                if (rows.length < 1) {
                    sql = `INSERT INTO reddits (server_id, reddit) VALUES ('${guild.id}', '${reddit}')`
                    try {
                        con.query(sql);
                        return resolve(true);
                    } catch (error) {
                        return resolve(error);
                    }
                } else {
                    return resolve(false);
                }
            })
        })
    },

    delreddit: function (guild, reddit) {
        return new Promise(function (resolve, reject) {
            con.query(`SELECT * FROM reddits WHERE server_id = '${guild.id}' AND reddit = '${reddit}'`, (err, rows) => {
                if (rows.length < 1) {
                    return resolve(false);
                } else {
                    sql = `DELETE FROM reddits WHERE server_id = '${guild.id}' AND reddit = '${reddit}'`
                    try {
                        con.query(sql);
                        return resolve(true);
                    } catch (error) {
                        return resolve(error);
                    }
                }
            })
        })
    },

    getreddits: function (id) {
        var reddits = []
        return new Promise(function (resolve, reject) {
            con.query(`SELECT * FROM reddits WHERE server_id = '${id}'`, (err, rows) => {
                if (rows.length < 1) {
                    resolve(false);
                } else {                    
                    a = 0;
                    while (a !== rows.length) {
                        name = rows[a].reddit;
                        reddits.push(name);
                        a++;
                    }

                    resolve(reddits);
                }
            })
        })
    },
}
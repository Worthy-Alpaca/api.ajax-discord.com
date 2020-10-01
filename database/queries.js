const con = require('./index');
const { tables } = require('../database/tables.json');

module.exports = {
    getcurrentserver: function(server_id) {
        return new Promise(function (resolve, reject) {
            con.query('SELECT * FROM servers WHERE id = ?', [server_id], function (error, results, fields) {
                if (error) return resolve(error.code);
                if (results.length = 1) {
                    
                    resolve(results[0])
                } else {
                    return resolve(false);
                }                
            });
        })
    },

    getchannels: function (server_id) {
        return new Promise(function (resolve, reject) {
            con.query('SELECT * FROM channels WHERE server_id = ?', [server_id], function (error, results, fields) {
                if (error) return resolve(error.code);
                resolve(results);
            });
        })
    },

    addchannel: function (channel, guild) {
        return new Promise(function (resolve, reject) {
            con.query("CREATE TABLE IF NOT EXISTS channels(server_id VARCHAR(255) NOT NULL, channel_id VARCHAR(255) NOT NULL UNIQUE, channel_name TEXT NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_general_ci;");
            con.query(`SELECT * FROM channels WHERE server_id = '${guild.id}' AND channel_id = '${channel.id}'`, (error, rows) => {
                if (error) return resolve(error.code);
                let sql;

                if (!rows.length) {
                    console.log(channel.name, "added")
                    sql = `INSERT INTO channels (server_id, channel_id, channel_name) VALUES ('${guild.id}', "${channel.id}", "${channel.name}")`
                    try {
                        con.query(sql);
                        return resolve(true);
                    } catch (error) {
                        return resolve(error);
                    }
                } else {
                    return resolve(false);
                }

            });
        })
    },

    delchannel: function (channel, guild) {
        return new Promise(function (resolve, reject) {
            con.query(`SELECT * FROM channels WHERE channel_name = '${channel.name}' AND channel_id = '${channel.id}'`, (error, rows) => {
                if (error) return resolve(error.code);
                if (rows.length === 1) {
                    let sql = `DELETE FROM channels WHERE channel_name = '${channel.name}' AND channel_id = '${channel.id}'`
                    try {
                        con.query(sql);
                        return resolve(true);
                    } catch (error) {
                        return resolve(error);
                    }
                }
            });
        })
    },

    updatechannel: function (newChannel, guild) {
        return new Promise(function (resolve, reject) {
            con.query(`SELECT * FROM channels WHERE server_id = '${guild.id}' AND channel_id = '${newChannel.id}'`, (error, rows) => {
                if (error) return resolve(error.code);
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
            con.query("CREATE TABLE IF NOT EXISTS roles(server_id VARCHAR(255) NOT NULL, role_id VARCHAR(255) NOT NULL UNIQUE, role_name TEXT NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_general_ci;");
            con.query(`SELECT * FROM roles WHERE server_id = '${guild.id}' AND role_id = '${role.id}'`, (error, rows) => {
                if (error) return resolve(error.code);
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
            con.query(`SELECT * FROM roles WHERE role_name = '${role.name}' AND role_id = '${role.id}'`, (error, rows) => {
                if (error) return resolve(error.code);
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
            con.query(`SELECT * FROM roles WHERE server_id = '${guild.id}' AND role_id = '${newRole.id}'`, (error, rows) => {
                if (error) return resolve(error.code);
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
            con.query(`SELECT * FROM servers WHERE id = '${guild.id}'`, (error, rows) => {
                if (error) return resolve(error.code);
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
            con.query(`SELECT * FROM servers WHERE id = '${guild.id}'`, (error, rows) => {
                if (error) return resolve(error.code);
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
            con.query(`SELECT * FROM login WHERE server_id = '${guild.id}'`, (error, rows) => {
                if (error) return resolve(error.code);
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
            con.query(`SELECT * FROM servers WHERE id = '${guild.id}'`, (error, rows) => {
                if (error) return resolve(error.code);
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
            con.query(`SELECT * FROM reddits WHERE server_id = '${guild.id}' AND reddit = '${reddit}'`, (error, rows) => {
                if (error) return resolve(error.code);
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
            con.query(`SELECT * FROM reddits WHERE server_id = '${guild.id}' AND reddit = '${reddit}'`, (error, rows) => {
                if (error) return resolve(error.code);
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
            con.query(`SELECT * FROM reddits WHERE server_id = '${id}'`, (error, rows) => {
                if (error) return resolve(error.code);
                if (rows.length < 1) {
                    resolve({
                        success: false,
                        value: false
                    });
                } else {                    
                    a = 0;
                    while (a !== rows.length) {
                        name = rows[a].reddit;
                        reddits.push(name);
                        a++;
                    }

                    resolve({
                        success: true,
                        value: reddits
                    });
                }
            })
        })
    },

    addrank: function (guild, rank) {
        let sql;
        return new Promise(function (resolve, reject) {
            con.query(`SELECT * FROM ranks WHERE server_id = '${guild.id}' AND rank_id = '${rank.id}'`, (error, rows) => {
                if (error) return resolve(error.code);
                if (rows.length < 1) {
                    sql = `INSERT INTO ranks (rank_id, server_id, rank_name) VALUES ('${rank.id}','${guild.id}', '${rank.name}')`
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

    delrank: function (guild, rank) {
        let sql;
        var success;
        if (typeof rank.id != 'undefined') {
            return new Promise(function (resolve, reject) {
                con.query(`SELECT * FROM ranks WHERE server_id = '${guild.id}' AND rank_id = '${rank.id}'`, (error, rows) => {
                    if (error) return resolve(error.code);
                    if (rows.length < 1) {
                        return resolve(false);
                    } else {
                        sql = `DELETE FROM ranks WHERE server_id = '${guild.id}' AND rank_id = '${rank.id}'`
                        try {
                            con.query(sql);
                            return resolve(true);
                        } catch (error) {
                            return resolve(error);
                        }
                    }
                })
            })
        } else {
            return new Promise(function (resolve, reject) {
                con.query(`SELECT * FROM ranks WHERE server_id = '${guild.id}' AND rank_name = '${rank}'`, (error, rows) => {
                    if (error) return resolve(error.code);
                    if (rows.length < 1) {
                        return resolve(false);
                    } else {
                        sql = `DELETE FROM ranks WHERE server_id = '${guild.id}' AND rank_name = '${rank}'`
                        try {
                            con.query(sql);
                            return resolve(true);
                        } catch (error) {
                            return resolve(error);
                        }
                    }
                })
            })
        }
    },

    getranks: function (id) {
        var ranks = []
        return new Promise(function (resolve, reject) {
            con.query(`SELECT * FROM ranks WHERE server_id = '${id}'`, (error, rows) => {
                if (error) return resolve(error.code);
                if (rows.length < 1) {
                    name = "No ranks on this server yet. Do you have suggestions for ranks? Contact the admin nearest to you."
                    ranks.push(name)
                    resolve({
                        success: true,
                        value: ranks
                    });
                } else {
                    a = 0;
                    while (a !== rows.length) {
                        name = rows[a].rank_name
                        ranks.push(name)
                        a++;
                    }

                    resolve({
                        success: true,
                        value: ranks
                    });
                }
            })
        })
    }, 

    checkrank: function (id, rank_id) {
        var r;
        return new Promise(function (resolve, reject) {
            con.query(`SELECT * FROM ranks WHERE server_id = '${id}' AND rank_id = '${rank_id}'`, (error, rows) => {
                if (error) return resolve(error.code);
                if (rows.length < 1) {
                    resolve({
                        success: true,
                        value: false
                    });
                } else {
                    resolve({
                        success: true,
                        value: true
                    });
                }
            })
        })
    },

    getinfractions: function (server, rMember) {
        con.query(`CREATE TABLE IF NOT EXISTS ${server}(member_id VARCHAR(20) NOT NULL UNIQUE, member_name TEXT NOT NULL, infractions INT NOT NULL);`)
        var infractions;
        return new Promise(function (resolve, reject) {
            con.query(`SELECT * FROM ${server} WHERE member_id = '${rMember}'`, (error, rows) => {
                if (error) resolve({
                    success: false,
                    err: error.code
                });
                if (rows.length < 1) {
                    infractions = 0;
                    resolve({
                        success: true,
                        value: infractions
                    });
                } else if (rows[0].member_id === rMember) {
                    infractions = rows[0].infractions;
                    resolve({
                        success: true,
                        value: infractions
                    });
                }

            })
        })
    },

    deleteinfractions: function (server, rMember) {
        
        return new Promise(function (resolve, reject) {
            con.query(`SELECT * FROM ${server} WHERE member_id = '${rMember}'`, (error, rows) => {
                if (error) return resolve(error.code);
                if (rows.length) {
                    let sql = `DELETE FROM ${server} WHERE member_id = '${rMember}'`

                    try {
                        con.query(sql);
                        return resolve(true);
                    } catch (error) {
                        return resolve(error);
                    }
                } else {
                    return resolve(false);
                }
            });
        })
    },

    createinfractions: function (server, rMember) {
        return new Promise(function (resolve, reject) {
            con.query(`SELECT * FROM ${server} WHERE member_id = '${rMember.userID}'`, (error, rows) => {
                if (error) return resolve(error.code);
                let sql;
                if (rows.length < 1) {
                    sql = `INSERT INTO ${server} (member_id, member_name, infractions) VALUES ('${rMember.userID}', '${rMember.displayName}', 1)`
                    try {
                        con.query(sql);
                        return resolve(true);
                    } catch (error) {
                        return resolve(error);
                    }
                } else {
                    return resolve(false);
                }                
                
            });
        })
    },

    updateinfractions: function (server, rMember) {

        return new Promise(function (resolve, reject) {
            con.query(`SELECT * FROM ${server} WHERE member_id = '${rMember.userID}'`, (error, rows) => {
                if (error) return resolve(error.code);
                let sql;
                if (rows[0].member_id === rMember.userID) {
                    var infraction = rows[0].infractions + 1;
                    sql = `UPDATE ${server} SET infractions = ${infraction} WHERE member_id = '${rMember.userID}'`
                    try {
                        con.query(sql);
                        return resolve(true);
                    } catch (error) {
                        return resolve(error);
                    }
                } else {
                    return resolve(false);
                }               
            });
        })
    },

    getservers: function () {
        var servers = []
        return new Promise(function (resolve, reject) {
            con.query(`SELECT * FROM servers`, (error, rows) => {
                if (error) return resolve(error.code);
                if (rows.length < 1) {
                    name = "I'm not deployed on any servers :frowning2:"
                    ranks.push(name)
                    resolve(ranks)
                } else {
                    a = 0;
                    while (a !== rows.length) {
                        name = rows[a].id
                        servers.push(name)
                        a++;
                    }

                    resolve(servers);
                }
            })
        })
    }, 

    getserverchannel: function (srv) {
        var chnl;
        return new Promise(function (resolve, reject) {
            
            con.query(`SELECT * FROM servers WHERE id = '${srv}'`, (error, rows) => {
                if (error) return resolve(error.code);

                if (rows[0].reports === null) {
                    return resolve(false);
                } else if (rows.length === 1) {
                    return resolve(rows[0].reports);
                }
            })
            
        })
    },

    checkcommand: function (command) {
        con.query("CREATE TABLE IF NOT EXISTS commands(name VARCHAR(512) NOT NULL, category VARCHAR(512) NOT NULL, description VARCHAR(1024) NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_general_ci;");
        return new Promise(function (resolve, reject) {
            var sql;
            con.query(`SELECT * FROM commands WHERE name = '${command.name}' AND category = '${command.category}'`, (error, rows) => {
                if (error) return resolve(error.code);
                if (command.descriptionlong) {
                    var description = command.descriptionlong;
                } else {
                    var description = command.description;
                }

                if (rows.length === 1) {
                    //console.log(rows[0])
                    if (rows[0].name === command.name && rows[0].category === command.category && rows[0].description === description) {
                        return resolve(false);
                    } else {
                        const oldname = rows[0].name;
                        console.log(oldname, command.name)
                        sql = `UPDATE commands SET name = '${command.name}' WHERE name = "${oldname}"`
                        con.query(sql);
                        sql = `UPDATE commands SET category = '${command.category}' WHERE name = "${oldname}"`
                        con.query(sql);
                        sql = `UPDATE commands SET description = "${description}" WHERE name = "${oldname}"`
                        try {
                            con.query(sql);
                            return resolve(false);
                        } catch (error) {
                            return resolve(error);
                        } 
                    }
                    
                } else {
                    sql = `INSERT INTO commands (name, category, description) VALUES ('${command.name}', '${command.category}', "${description}")`;
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

    getcommands: function () {        
        const setup = [];
        const info = [];
        const moderation = [];
        const fun = [];
        return new Promise(function (resolve, reject) {

            con.query(`SELECT * FROM commands`, (error, rows) => {
                if (error) return resolve(error.code);
                rows.forEach(element => {
                    if (element.category === "setup") {
                        setup.push(`!${element.name} => ${element.description}`)
                    } else if (element.category === "info") {
                        info.push(`!${element.name} => ${element.description}`)
                    } else if (element.category === "moderation") {
                        moderation.push(`!${element.name} => ${element.description}`)
                    } else if (element.category === "fun") {
                        fun.push(`!${element.name} => ${element.description}`)
                    }
                })
                const commands = {
                    "setup": setup,
                    "info": info,
                    "moderation": moderation,
                    "fun": fun
                }
                return resolve(commands);

            })

        })
    },

    checkstatus: function () {
        var check = 0;
        return new Promise(function (resolve, reject) {
            con.query(`SELECT * FROM information_schema.tables WHERE table_schema = 'discord'`, (error, rows) => {
                if (error) return resolve(error.code);
                
                rows.forEach(element => {
                    if (tables.includes(element.TABLE_NAME)) {
                        check++;
                    }
                });
                
                if (check === tables.length) {
                    return resolve(true);
                } else {
                    return resolve(false);
                }
            })
        })
    },

    deleteTable: function (table) {
        return new Promise(function (resolve, reject) {
            con.query(`DROP TABLE ${table}`, (error, rows) => {
                if (error) return resolve(error.code);
                return resolve(true);
            })
        })
    }
}
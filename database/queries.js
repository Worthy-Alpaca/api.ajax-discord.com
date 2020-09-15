const { response } = require('express');
const con = require('./index');

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
        return new Promise(function(resolve, reject) {
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
        //con.query(`CREATE TABLE IF NOT EXISTS ${server}(member_id VARCHAR(20) NOT NULL UNIQUE, member_name TEXT NOT NULL, infractions INT NOT NULL);`)
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
                if (error) throw error;
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
            try {
                con.query(`SELECT * FROM servers WHERE id = '${srv}'`, (error, rows) => {
                    if (rows[0].reports === null) {
                        return resolve(false);
                    } else if (rows.length === 1) {
                        return resolve(rows[0].reports);
                    }
                })
            } catch (error) {
                return resolve(error);
            }
        })
    },
}
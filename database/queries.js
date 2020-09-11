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
}
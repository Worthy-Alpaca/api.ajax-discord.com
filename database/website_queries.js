const con = require('./index');

module.exports = {
    getcurrentserver: function (server_id) {
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

    getchannelname: function (server_id, channel_id) {
        return new Promise(function (resolve, reject) {
            con.query('SELECT * FROM channels WHERE server_id = ? AND channel_id = ?', [server_id, channel_id], function (error, results, fields) {
                if (error) return resolve(error.code);
                if (results.length = 1) {
                    if (results[0] === undefined) return resolve(false);
                    resolve(results[0].channel_name);
                } else {
                    return resolve(false);
                }
            });
        })
    },

    getrolename: function (server_id, role_id) {
        return new Promise(function (resolve, reject) {
            con.query('SELECT * FROM roles WHERE server_id = ? AND role_id = ?', [server_id, role_id], function (error, results, fields) {
                if (error) return resolve(error.code);
                if (results.length = 1) {
                    if (results[0] === undefined) return resolve(false);
                    resolve(results[0].role_name);
                } else {
                    return resolve(false);
                }
            });
        })
    },

    getroles: function (server_id) {
        return new Promise(function (resolve, reject) {
            con.query('SELECT * FROM roles WHERE server_id = ?', [server_id], function (error, results, fields) {
                if (error) return resolve(error.code);
                resolve(results);
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
    }
}
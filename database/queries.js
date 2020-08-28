
module.exports = {
    getcurrentserver: function(server_id, con) {
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

    getchannels: function (server_id, con) {
        return new Promise(function (resolve, reject) {
            con.query('SELECT * FROM channels WHERE server_id = ?', [server_id], function (error, results, fields) {
                resolve(results);
            });
        })
    }
}
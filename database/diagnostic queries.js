const con = require('./index');

module.exports = {
    increase: function (channel_name, count) {
        return new Promise(function (resolve, reject) {
            con.query("SELECT * FROM diagnostics WHERE channel_name = ?", [channel_name], (err, rows) => {
                if (err) return resolve(err);

                if (!rows.length) {
                    sql = `INSERT INTO diagnostics (channel_name, character_count, messages_count) VALUES ('${channel_name}', ${count}, ${1})`
                    con.query(sql);
                    return resolve(true);
                } else if (rows[0].channel_name === channel_name) {
                    console.log("here")
                    let setcount = rows[0].character_count + count;
                    sql = `UPDATE diagnostics SET character_count = '${setcount}' WHERE channel_name = '${channel_name}'`
                    con.query(sql);
                    sql2 = `UPDATE diagnostics SET messages_count = '${rows[0].messages_count + 1}' WHERE channel_name = '${channel_name}'`
                    con.query(sql2);
                    return resolve(true);
                } else {
                    return resolve("Something went wrong");
                }

                
            })
        })
    },

    getstatistics: function (channel_name) {
        return new Promise(function (resolve, reject) {
            con.query("SELECT * FROM diagnostics WHERE channel_name = ?", [channel_name], (err, rows) => {
                if (err) return resolve(err);

                if (!rows.length) {
                    return resolve({
                        success: false,
                        value: null
                    });
                } else {
                    return resolve({
                        success: true,
                        value: rows
                    });
                }
            })
        })
    },
}
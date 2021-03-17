const fetch = require('node-fetch');

module.exports = {
    /**
    * @description creates an API GET request
    * @param {string} guildID - the guildID
    */
    get_API_call: function (guildID, type = '') {
        return new Promise(async function (resolve, reject) {
            //console.log(token)
            const response = await fetch(process.env.BOT + `/recover/?guildID=${guildID}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'type': type,
                }
            }).then(function (response) {
                
                if (response.status === 200) {
                    return resolve(true);
                }
            }).catch(error => {
                return console.log(error);
            })

            


        })
    },
}
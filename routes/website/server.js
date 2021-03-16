const router = require('express').Router();
//Import verify module
const verify = require('../verifyToken');
//Import functions
const functions = require('../../database/website_queries');
const api = require('./functions/apifunctions');


router.get('/getserver', verify, async (req, res) => {
    const data = await functions.getcurrentserver(req.query.guildID);
    const server = {
        data,
        plaintext: {
            "admin": await functions.getrolename(req.query.guildID, data.admin),
            "moderator": await functions.getrolename(req.query.guildID, data.moderator),
            "channel": await functions.getchannelname(req.query.guildID, data.channel),
            "approved": await functions.getrolename(req.query.guildID, data.approved),
            "reports": await functions.getchannelname(req.query.guildID, data.reports)
        } 
    }
    //console.log(server)
    

    if (data || typeof data == 'number') {
        console.log("general get success")
        //res.headers.append('Access-Control-Allow-Origin', '*');
        res.status(200).json(server);
    } else if (data === false) {
        res.status(200).json({
            status: 200,
            success: false,
            err: 'no data'
        });
    } else {
        console.log("general get error");
        res.status(409).json({
            status: 409,
            success: false,
            err: data
        });
    }
    res.end();
})

router.get('/getcomponents', verify, async (req, res) => {
    const data = {
        roles: await functions.getroles(req.query.guildID),
        channels: await functions.getchannels(req.query.guildID)
    }
    
    if (data || typeof data == 'number') {
        console.log("general get success")
        //res.headers.append('Access-Control-Allow-Origin', '*');
        res.status(200).json(data);
    } else if (data === false) {
        res.status(200).json({
            status: 200,
            success: false,
            err: 'no data'
        });
    } else {
        console.log("general get error");
        res.status(409).json({
            status: 409,
            success: false,
            err: data
        });
    }
    res.end();
})

router.put('/test', verify, async (req, res) => {
    console.log("#################################")
    console.log(req.body)
    res.status(200);
    res.end();
})

module.exports = router;
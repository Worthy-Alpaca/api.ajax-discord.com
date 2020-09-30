const router = require('express').Router();
//Import verify module
const verify = require('../verifyRegister');
//import DB queries
const { checkstatus, getcurrentserver, getchannels, deleteServer1, deleteServer2, setServer, getservers, getserverchannel } = require('../../database/queries.js');
///import DB connection
const con = require('../../database/index');

//add new user to database
router.post('/showserver', verify, async (req, res) => {
    //console.log(req)
    //get components
    const server_id = req.body.server_id;
    const currentserver = await getcurrentserver(server_id);

    res.json(currentserver);
    res.end();
});

router.post('/showchannels', verify, async (req, res) => {
    const server_id = req.body.server_id;

    const allchannels = await getchannels(server_id);
    res.json(allchannels);
    res.end();
});

router.get('/getserver', verify, async (req, res) => {
    //console.log(req.query)
    //get components
    //const server_id = req.headers.serverid;
    const success = await getcurrentserver(req.query.guildID);

    if (success || typeof success == 'number') {
        console.log("general get success")
        res.status(200).json(success);
    } else if (success === false) {
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
            err: success
        });
    }
    res.end();
});

router.delete('/deleteserver', verify, async (req, res) => {
    const guild = req.body.guild;
    
    const green1 = await deleteServer1(guild);
    const green2 = await deleteServer2(guild);

    if (green1 && green2) {
        res.status(200).json({
            success: true,
            err: null
        });
    } else {
        res.status(200).json({
            success: false,
            err: "Couldn't delete from Database"
        });
    }
    res.end();
}),
    
router.put('/setup', verify, async (req, res) => {
    //console.log(req.body)
    const success = await setServer(req.body.guild, req.body.field, req.body.value);

    if (success === true) {
        console.log("update of field successfull")
        res.status(200).json({
            success: true,
            err: null
        });
    } else {
        console.log("update of field error");
        res.status(409).json({
            success: false,
            err: success
        });
    }
    res.end();
})

router.get('/check', verify, async (req, res) => {
    
    const success = await checkstatus(req.query.payload);
    
    if (success === true) {  
        console.log("Bot connection successfully");
        res.status(200).json({
            success: true,
            err: null
        });
    } else {        
        res.status(409).json({
            success: false,
            err: success
        });
    }
    res.end();
})

router.get('/announcements', verify, async (req, res) => {
    if (req.headers.type === 'announcements/getserver') {
        var success = await getservers();
    } else if (req.headers.type === 'announcements/getchannel') {
        var success = await getserverchannel(req.query.payload);
    }

    if (success || typeof success == 'number') {
        console.log("general get success")
        res.status(200).json(success);
    } else if (success === false) {
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
            err: success
        });
    }
    res.end();
})

module.exports = router;
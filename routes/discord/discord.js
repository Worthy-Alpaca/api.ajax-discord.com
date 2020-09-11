const router = require('express').Router();
//Import verify module
const verify = require('../verifyRegister');
//import DB queries
const { getcurrentserver, getchannels, deleteServer1, deleteServer2 } = require('../../database/queries.js');

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
    //console.log(req)
    //get components
    const server_id = req.headers.server_id;
    const currentserver = await getcurrentserver(server_id);

    res.json(currentserver);
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
        res.status(409).json({
            success: false,
            err: "Couldn't delete from Database"
        });
    }
    res.end();
})

module.exports = router;
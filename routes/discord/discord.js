const router = require('express').Router();
//Import verify module
const verify = require('../verifyRegister');
//import DB queries
const { getcurrentserver, getchannels } = require('../../database/queries.js');

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

module.exports = router;
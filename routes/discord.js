const router = require('express').Router();
const con = require('../database/index');
//Import verify module
const verify = require('./verifyRegister');
//import encryption
const bcrypt = require('bcryptjs');
//import DB queries
const { getcurrentserver, getchannels } = require('../database/queries.js');

//add new user to database
router.post('/showserver', verify, async (req, res) => {
    //console.log(req)
    //get components
    const server_id = req.body.server_id;
    const currentserver = await getcurrentserver(server_id, con);

    res.json(currentserver);
});

router.post('/showchannels', verify, async (req, res) => {
    const server_id = req.body.server_id;

    const allchannels = await getchannels(server_id, con);
    res.json(allchannels);
})

module.exports = router;
const router = require('express').Router();
//Import verify module
const verify = require('../verifyRegister');
//import DB queries
const { addchannel, delchannel, updatechannel } = require('../../database/queries.js');

router.post('/create', verify, async (req, res) => {
    const channel = req.body.channel;
    const guild = req.body.guild;

    const success = await addchannel(channel, guild);

    if (success) {
        console.log("adding success")
        res.status(200).json({
            sucess: true,
            err: null
        });
    } else {
        console.log("error");
        res.status(409).json({
            sucess: false,
            err: success
        });
    }
    res.end();
});

router.delete('/delete', verify, async (req, res) => {
    const channel = req.body.channel;
    const guild = req.body.guild;

    const success = await delchannel(channel, guild);

    if (success) {
        console.log("delete success")
        res.status(200).json({
            sucess: true,
            err: null
        });
    } else {
        console.log("error");
        res.status(409).json({
            sucess: false,
            err: success
        });
    }
    res.end();
});

router.put('/update', verify, async (req, res) => {
    const channel = req.body.channel;
    const guild = req.body.guild;

    const success = await updatechannel(channel, guild);

    if (success) {
        console.log("update success")
        res.status(200).json({
            sucess: true,
            err: null
        });
    } else {
        console.log("error");
        res.status(409).json({
            sucess: false,
            err: success
        });
    }
    res.end();
})

module.exports = router;
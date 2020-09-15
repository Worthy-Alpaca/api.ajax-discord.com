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
        console.log("channel adding success")
        res.status(200).json({
            success: true,
            err: null
        });
    } else {
        console.log("channel create error");
        res.status(409).json({
            success: false,
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
        console.log("channel delete success")
        res.status(200).json({
            success: true,
            err: null
        });
    } else {
        console.log("channel delete error");
        res.status(409).json({
            success: false,
            err: success
        });
    }
    res.end();
});

router.put('/update', verify, async (req, res) => {
    const channel = req.body.channel;
    const guild = req.body.guild;

    const success = await updatechannel(channel, guild);
    if (success === true) {
        console.log("misc update success")
        res.status(200).json({
            success: true,
            err: null
        });
    } else if (success === false) {
        res.status(200).json({
            status: 200,
            success: false,
            err: 'no such data'
        });
    } else {
        console.log("misc update error");
        res.status(409).json({
            success: false,
            err: success
        });
    }
    res.end();
})

module.exports = router;
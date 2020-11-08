const router = require('express').Router();
//Import verify module
const verify = require('../verifyRegister');
//import DB queries
const { addrole, delrole, updaterole } = require('../../database/queries.js');

router.post('/create', verify, async (req, res) => {
    const role = req.body.role;
    const guild = req.body.guild;

    const success = await addrole(role, guild);

    if (success === true) {
        console.log("role adding success")
        res.status(200).json({
            success: true,
            err: null
        });
    } else {
        console.log("role adding error");
        res.status(409).json({
            success: false,
            err: success
        });
    }
    res.end();
});

router.delete('/delete', verify, async (req, res) => {
    const role = req.body.role;
    const guild = req.body.guild;

    const success = await delrole(role, guild);

    if (success === true) {
        console.log("role delete success")
        res.status(200).json({
            success: true,
            err: null
        });
    } else {
        console.log("role delete error");
        res.status(409).json({
            success: false,
            err: success
        });
    }
    res.end();
});

router.put('/update', verify, async (req, res) => {
    const role = req.body.role;
    const guild = req.body.guild;

    const success = await updaterole(role, guild);
    if (success === true) {
        console.log("role update success")
        res.status(200).json({
            success: true,
            err: null
        });
    } else if (success === 'Name not changed') {
        console.log("role update error");
        res.status(409).json({
            success: false,
            err: success
        });
    }
    res.end();
});

router.get('/get', verify, async (req, res) => {
    res.status(404).json({
        message: "No Data here yet"
    })
    res.end();
})

module.exports = router;
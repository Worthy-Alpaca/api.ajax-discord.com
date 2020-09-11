const router = require('express').Router();
//Import verify module
const verify = require('../verifyRegister');
//import DB queries
const { addrole, delrole, updaterole } = require('../../database/queries.js');

router.post('/create', verify, async (req, res) => {
    const role = req.body.role;
    const guild = req.body.guild;

    const success = await addrole(role, guild);

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
    const role = req.body.role;
    const guild = req.body.guild;

    const success = await delrole(role, guild);

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
    const role = req.body.role;
    const guild = req.body.guild;

    const success = await updaterole(role, guild);
    console.log(success);
    if (success === true) {
        console.log("update success")
        res.status(200).json({
            sucess: true,
            err: null
        });
    } else if (success === 'Name not changed') {
        console.log("error");
        res.status(409).json({
            sucess: false,
            err: success
        });
    }
    res.end();
})

module.exports = router;
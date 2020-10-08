const router = require('express').Router();
//Import verify module
const verify = require('../verifyRegister');
//import DB queries
const functions = require('../../database/queries.js');

router.post('/create', verify, async (req, res) => {
    if (req.headers.type === 'misc/reddit') {        
        var success = await functions.addreddit(req.body.guild, req.body.value);
    } else if (req.headers.type === 'misc/rank') {
        var success = await functions.addrank(req.body.guild, req.body.value);
    } else if (req.headers.type === 'misc/infractions') {
        var success = await functions.createinfractions(req.body.server, req.body.value);
    } else if (req.headers.type === 'misc/coc') {
        var success = await functions.createCoC(req.body.guildID, req.body.coc);
    }

    if (success === true) {
        console.log("misc adding success")
        res.status(200).json({
            status: 200,
            success: true,
            err: null
        });
    } else if (success === false) {
        res.status(200).json({
            status: 200,
            success: false,
            err: 'data exists already'
        });
    } else {
        console.log("misc adding error");
        res.status(409).json({
            status: 409,
            success: false,
            err: success
        });
    }
    res.end();
});

router.delete('/delete', verify, async (req, res) => {
    
    if (req.headers.type === 'misc/reddit') {
        var success = await functions.delreddit(req.body.guild, req.body.value);
    } else if (req.headers.type === 'misc/rank') {
        var success = await functions.delrank(req.body.guild, req.body.value);
    } else if (req.headers.type === 'misc/infractions') {
        var success = await functions.deleteinfractions(req.body.server, req.body.value);
    } else if (req.headers.type === 'misc/coc') {
        var success = await functions.deleteCoC(req.query.guildID, req.body.id);
    }

    if (success === true) {
        console.log("misc delete success")
        res.status(200).json({
            status: 200,
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
        console.log("misc delete error");
        res.status(409).json({
            status: 409,
            success: false,
            err: success
        });
    }
    res.end();
});

router.put('/update', verify, async (req, res) => {
    
    if (req.headers.type === 'misc/infractions') {
        var success = await functions.updateinfractions(req.body.server, req.body.value);
    } else if (req.headers.type === 'misc/coc') {
        var success = await functions.updateCoC(req.query.guildID, req.body.id, req.body.coc);
    }

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
});

router.get('/get', verify, async (req, res) => {

    if (req.headers.type === 'misc/reddit') {
        var success = await functions.getreddits(req.query.guildID);
    } else if (req.headers.type === 'misc/rank') {
        var success = await functions.getranks(req.query.guildID);
    } else if (req.headers.type === 'misc/checkrank') {
        var success = await functions.checkrank(req.query.guildID, req.query.payload);
    } else if (req.headers.type === 'misc/infractions') {
        var success = await functions.getinfractions(req.query.payload, req.query.extraPayload);        
    } else if (req.headers.type === 'misc/coc') {
        var success = await functions.getCoC(req.query.guildID);
    }


    if (success.success === true || typeof success == 'number') {
        console.log("misc get success")
        res.status(200).json(success.value);
    } else if (success.success === false) {
        console.log("misc get failure")
        res.status(200).json({
            status: 200,
            success: false,
            err: 'no data'
        });
    } else {
        console.log("misc get error");
        res.status(409).json({
            status: 409,
            success: false,
            err: success
        });
    }
    res.end();
});

module.exports = router;
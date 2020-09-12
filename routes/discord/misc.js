const router = require('express').Router();
//Import verify module
const verify = require('../verifyRegister');
//import DB queries
const { addreddit, delreddit, getreddits, addrank, delrank, getranks, checkrank, getinfractions, createinfractions, deleteinfractions, updateinfractions } = require('../../database/queries.js');

router.post('/create', verify, async (req, res) => {
    if (req.headers.type === 'misc/reddit') {        
        var success = await addreddit(req.body.guild, req.body.value);
    } else if (req.headers.type === 'misc/rank') {
        var success = await addrank(req.body.guild, req.body.value);
    } else if (req.headers.type === 'misc/infractions') {
        var success = await createinfractions(req.body.server, req.body.value);
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
        var success = await delreddit(req.body.guild, req.body.value);
    } else if (req.headers.type === 'misc/rank') {
        var success = await delrank(req.body.guild, req.body.value);
    } else if (req.headers.type === 'misc/infractions') {
        var success = await deleteinfractions(req.body.server, req.body.value);
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
        var success = await updateinfractions(req.body.server, req.body.value);
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
        var success = await getreddits(req.headers.server_id);
    } else if (req.headers.type === 'misc/rank') {
        var success = await getranks(req.headers.server_id);
    } else if (req.headers.type === 'misc/checkrank') {
        var success = await checkrank(req.headers.server_id, req.headers.payload);
    } else if (req.headers.type === 'misc/infractions') {
        var success = await getinfractions(req.headers.payload, req.headers.extra_payload);        
    }


    if (success || typeof success == 'number') {
        console.log("misc get success")
        res.status(200).json(success);
    } else if (success === false) {
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
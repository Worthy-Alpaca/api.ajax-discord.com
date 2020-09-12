const router = require('express').Router();
//Import verify module
const verify = require('../verifyRegister');
//import DB queries
const { addreddit, delreddit, getreddits } = require('../../database/queries.js');

router.post('/create', verify, async (req, res) => {
    if (req.headers.type === 'misc/reddit') {        
        var success = await addreddit(req.body.guild, req.body.value);
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
    
    if (req.headers.type === 'misc/reddit') {

    }

    if (success === true) {
        console.log("misc update success")
        res.status(200).json({
            success: true,
            err: null
        });
    } else if (success === false) {

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
        var success = await getreddits(req.headers.server_id)
    }
    if (success) {
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
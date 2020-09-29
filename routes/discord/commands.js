const router = require('express').Router();
//Import verify module
const verify = require('../verifyRegister');
//import DB queries
const { checkcommand, deleteTable } = require('../../database/queries.js');

router.post('/create', verify, async (req, res) => {
    
    const success = await checkcommand(req.body.command)
    
    if (success === true) {
        //console.log("command adding success")
        res.status(200).json({
            success: true,
            err: null
        });
    } else if (success === false) {
        res.status(200).json({
            success: false,
            err: null
        });
    } else {
        console.log("command adding error");
        res.status(409).json({
            status: 409,
            success: false,
            err: success
        });
    }
    res.end();
});

router.delete('/delete', verify, async (req, res) => {

    if (req.headers.type === "delete/table") {
        var success = await deleteTable(req.body.table);
    }

    if (success === true) {
        console.log("command delete success")
        res.status(200).json({
            success: true,
            err: null
        });
    } else {
        console.log("command delete error");
        res.status(409).json({
            success: false,
            err: success
        });
    }
    res.end();
});

router.put('/update', verify, async (req, res) => {
    res.status(404).json({
        message: "No Data here yet"
    })
    
    /* if (success === true) {
        console.log("command update success")
        res.status(200).json({
            success: true,
            err: null
        });
    } else if (success === 'Name not changed') {
        console.log("command update error");
        res.status(409).json({
            success: false,
            err: success
        });
    } */
    res.end();
});

router.get('/get', verify, async (req, res) => {
    
    res.status(404).json({
        message: "No Data here yet"
    })

    res.end();
})

module.exports = router;
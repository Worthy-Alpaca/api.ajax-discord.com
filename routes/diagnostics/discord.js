const router = require('express').Router();
//Import verify module
const verify = require('../verifyRegister');
const { increase, getstatistics, resetstatistic } = require('../../database/diagnostic queries');

router.post('/post', verify, async (req, res) => {
    const success = await increase(req.body.channel, req.body.counter);

    if (success === true) {
        res.status(200).json({
            success: true,
            err: null
        });
    } else {
        res.status(409).json({
            success: false,
            err: success
        });
    }
    res.end();
})

router.get('/get', verify, async (req, res) => {
    const success = await getstatistics(req.query.payload)

    if (success.success === true) {
        res.status(200).json(success.value);
    } else if (success.success === false) {
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
})

router.delete('/delete', verify, async (req, res) => {

    const success = await resetstatistic(req.body.channel);

    if (success === true) {
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
        res.status(409).json({
            status: 409,
            success: false,
            err: success
        });
    }
    res.end();
});

module.exports = router;
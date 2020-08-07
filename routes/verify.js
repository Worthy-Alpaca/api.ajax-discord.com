const router = require('express').Router();
const verify = require('./verifyToken');

router.post('/', verify, (req, res) => {
    console.log("here")
    res.json({
        verify: true
    })
});

module.exports = router;
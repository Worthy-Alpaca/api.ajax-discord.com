const router = require('express').Router();

router.post('/register', (req, res) => {
    console.log("test")
    res.send('Test')
});



module.exports = router;
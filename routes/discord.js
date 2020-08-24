const router = require('express').Router();
const con = require('../database/index');
//import validation features
const { registerValidation, loginValidation } = require('../validation');
const verify = require('./verifyRegister');
//import encryption
const bcrypt = require('bcryptjs');

//add new user to database
router.post('/showserver', verify, async (req, res) => {
    //console.log(req)
    //get components
    const server_id = req.body.server_id;

    con.query('SELECT * FROM servers WHERE id = ?', [server_id], function (error, results, fields) {
        
        if (results.length = 1) {
            //console.log(results[0])
            res.json(results[0])
        } else {
            res.json({
                error: 'No user found'
            })
        }
        res.end();
    });
});

router.post('/showchannels', verify, async (req, res) => {
    const server_id = req.body.server_id;

    con.query('SELECT * FROM channels WHERE server_id = ?', [server_id], function (error, results, fields) {

        res.json(results);
        res.end();
    });
})

module.exports = router;
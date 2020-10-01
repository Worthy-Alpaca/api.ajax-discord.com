const router = require('express').Router();
const con = require('../database/index');
//import validation features
const { registerValidation, loginValidation } = require('../validation');
const jwt = require('jsonwebtoken');
const verify = require('./verifyRegister');
//import encryption
const bcrypt = require('bcryptjs');
//import DB query
const { newServer, registerNew } = require('../database/queries');

//add new user to database
router.post('/register', verify, async (req, res) => {
    //console.log(req.body)
    //validating request body
    const { error } = registerValidation(req.body);
    if (error) {
        console.log("error")
        return res.status(400).send(error.details[0].message);
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //get components
    const username = req.body.username;
    const success = await newServer(req.body.guild);
    //console.log(req.body.guild)
    if (success) {
        con.query('SELECT * FROM login WHERE server_id = ?', [username], function (error, results, fields) {
            if (results.length > 0) {
                /* res.send('This user already exists') */
                res.status(907).json({
                    success: false,
                    token: null,
                    err: 'This user already exists'
                });
            } else {
                sql = `INSERT INTO login (server_id, password) VALUES ('${username}', '${hashedPassword}')`
                con.query(sql);
                res.sendStatus(200);
            }
            res.end();
        });
    } else {
        res.status(907).json({
            success: false,
            token: null,
            err: 'This user already exists'
        });
        res.end();
    }
});

router.post('/registernew', verify, async (req, res) => {
    //console.log(req.body)
    //validating request body

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //get components
    const username = req.query.username;
    const success = await registerNew(username, hashedPassword);
    
    //console.log(req.body.guild)
    if (success === true) {
        res.status(200).json({
            success: true,
            err: null
        });
    } else if (success === false) {
        res.status(200).json({
            success: false,
            err: 'This user already exists'
        });        
    } else {
        res.status(907).json({
            success: false,
            err: success
        });  
    }
    res.end();
});


//login
router.post('/login', (req, res) => {
    //console.log(req.body)
    //validating request body
    const { error } = loginValidation(req.body);
    if (error) {
        console.log("test")
        return res.status(400).send(error.details[0].message);
    }
    //get components
    const username = req.body.username;

    con.query('SELECT * FROM login WHERE server_id = ?', [username], async function (error, results, fields) {
        if (results.length > 1) {
        /* res.status(400).send("More then one user detected. Please contact a server admin!"); */
            res.status(401).json({
                success: false,
                token: null,
                err: 'More then one user detected. Please contact a server admin!'
            });
        } else if (results.length < 1) {
            return res.status(401).json({
                success: false,
                token: null,
                err: 'Entered Username incorrect!'
            });
        } else {
            //Create and assign token
            const token = jwt.sign({ _id: username }, process.env.TOKEN_SECRET);
            //check if password is correct
            const validPass = await bcrypt.compare(req.body.password, results[0].password);
            if (!validPass) {
                return res.status(401).json({
                    success: false,
                    token: null,
                    err: 'Entered Password incorrect!'
                });
            }
            res.json({
                success: true,
                err: null,
                token
            });
            /* res.redirect(process.env.WEBSITE + "/dashboard") */
        }
        res.end();
    });
})


module.exports = router;
const router = require('express').Router();
const con = require('../database/index');
//import validation features
const { registerValidation, loginValidation } = require('../validation');
const jwt = require('jsonwebtoken');
const verify = require('./verifyRegister');
//import encryption
const bcrypt = require('bcryptjs');

//add new user to database
router.post('/register', verify, async (req, res) => {
    console.log("so far so good")
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
    
    con.query('SELECT * FROM login WHERE server_id = ?', [username], function (error, results, fields) {
        if (results.length > 0) {
            res.send('This user already exists')
        } else {
            sql = `INSERT INTO login (server_id, password) VALUES ('${username}', '${hashedPassword}')`
            con.query(sql);
            res.sendStatus(200);
        }
        res.end();
    });
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
                sucess: false,
                token: null,
                err: 'More then one user detected. Please contact a server admin!'
            });
        } else if (results.length < 1) {
            return res.status(401).json({
                sucess: false,
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
                    sucess: false,
                    token: null,
                    err: 'Entered Password incorrect!'
                });
            }
            res.json({
                sucess: true,
                err: null,
                token
            });
            /* res.redirect(process.env.WEBSITE + "/dashboard") */
        }
        res.end();
    });
})


module.exports = router;
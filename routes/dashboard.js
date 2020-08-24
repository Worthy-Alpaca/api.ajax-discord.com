const router = require('express').Router();
const verify = require('./verifyToken');
const {Client} = require('discord.js');
const client = new Client();


router.get('/', verify, (req, res) => {
    res.redirect(process.env.WEBSITE + "/")
});

module.exports = router;
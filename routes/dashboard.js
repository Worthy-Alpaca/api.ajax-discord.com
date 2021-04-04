const router = require('express').Router();
const verify = require('./verifyToken');


router.get('/', verify, (req, res) => {
	res.redirect(process.env.WEBSITE + '/');
});

module.exports = router;
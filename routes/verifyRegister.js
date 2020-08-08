const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('auth-token');
    console.log(req)
    if (!token) {
        return res.status(400).send('Access denied');
    }
    console.log("verify");
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch {
        console.log("login redirect")
        res.status(400).send('Invalid Token!!');
    }
}
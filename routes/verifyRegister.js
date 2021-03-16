const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(400).send('Access denied');
    }
    //console.log("verify");
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET, {maxAge: "1m"});
        req.user = verified;
        next();
    } catch (err) {
        //console.log("login redirect")
        if (err.name === "TokenExpiredError") {
            return res.status(400).json({
                status: 400,
                success: false,
                err: err
            })
        }
        res.status(400).send('Invalid Token!!');
    }
}
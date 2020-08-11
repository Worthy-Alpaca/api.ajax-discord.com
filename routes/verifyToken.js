const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('auth-token');
    if (!token) {
        //console.log("login redirect1")
        return res.redirect(process.env.WEBSITE + "/login");
    }
    //console.log("verify");
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch {
        //console.log("login redirect")
        res.redirect(process.env.WEBSITE + "/login")
    }
}


const jwt = require('jsonwebtoken');
const fs = require('fs');
const User = require('../models/user');
const config = require('../config/config');

const createSecureToken = function (id) {
    var privateKey = fs.readFileSync(config.PRIVATE_KEY, 'utf8');
    return jwt.sign(
        { user_id: id },
        privateKey,
        { algorithm: "RS256", expiresIn: "12h" });
}


const verifyToken = function (req, res, next) {
    var token, header;
    try {
        header = req.headers.authorization;
        if (!header) return res.status(401).send({ error: 'Access Denied' });
        token = header.split(' ')[1];
    }
    catch (err) {
        token = "";
    }
    if (!token) return res.status(401).send({ error: 'Access Denied' });
    try {
        var publicKey = fs.readFileSync(config.PUBLIC_KEY, 'utf8');
        const verified = jwt.verify(token, publicKey, { algorithm: ["RS256"], expiresIn: "12h" });
        req.user = verified;

        // check if id exists in db
        User.findOne({ _id: req.user.user_id }, "role").then(user => {
            if (!user) res.status(404).send({ error: 'Access Denied' });
            else {
                req.user.role = user.role;
                next();
            }
        });
    }
    catch (err) {
        return res.status(400).send({ error: 'Invalid Token' });
    }
}

module.exports.createSecureToken = createSecureToken;
module.exports.verifyToken = verifyToken;
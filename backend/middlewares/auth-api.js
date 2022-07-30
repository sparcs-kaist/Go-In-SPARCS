const secret = require('../utils/secret');
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.get('Authorization');

    if (token) {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                console.log("Auth error: Token not found");
                res.status(403).json({
                    ok: false,
                    reason: 'not-logged-in'
                });
                return;
            }
            if (decoded && decoded.type === 'auth') {
                req.user_id = decoded.id;
                console.log('Auth success at api:', req.user_id);
                next();
            }
        });
    }


}

module.exports = auth;

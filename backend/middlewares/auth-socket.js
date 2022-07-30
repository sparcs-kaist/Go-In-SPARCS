const secret = require('../utils/secret');
const jwt = require('jsonwebtoken');

function auth(socket, next) {
    if (socket.handshake.query && socket.handshake.query.token) {

        jwt.verify(socket.handshake.query.token, secret, (err, decoded) => {
            if (err) {
                console.log("Auth error: verify failed");
                socket.emit('auth_error', {});
                return next();
            }
            if (decoded && decoded.type === 'auth') {
                socket.user_id = decoded.id;
                console.log('Auth success at socket:', socket.user_id)
                next();
            }
        });
    } else {
        console.log("Auth error: Token not found");
        socket.emit('auth_error', {});
        return next();
    }
}


module.exports = auth;

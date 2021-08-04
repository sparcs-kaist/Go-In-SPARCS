module.exports = server => {
    return require('socket.io')(server, {
        cors: {
            methods: ["GET", "POST"],
            transports: ['websocket', 'polling'],
            credentials: true
        },
        allowEIO3: true
    });
}

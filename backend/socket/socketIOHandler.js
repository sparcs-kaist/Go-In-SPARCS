const {addComment, getComments, deleteComment} = require('../models/Comment').handlers;
const authSocket = require('../middlewares/auth-socket');

module.exports = io => {
    io.use(authSocket);
    io.on('connection', async (socket) => {

        socket.on('disconnect', () => {
            console.log('User exited')
        });

        socket.on('comments/add', async (data) => {
            if(await addComment(data, socket.user_id)) io.emit('comments', await getComments())
        });

        socket.on('comments/delete', async (data) => {
            if(await deleteComment(data, socket.user_id)) io.emit('comments', await getComments())
        });

        socket.emit('comments', await getComments())
        console.log('User entered')
    })
}

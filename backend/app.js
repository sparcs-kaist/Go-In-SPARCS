const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { Sequelize, Model, DataTypes } = require('sequelize');
const cors = require('cors');
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"],
        transports: ['websocket', 'polling'],
        credentials: true
    },
    allowEIO3: true
});

app.use(cors())
app.use(bodyParser.json())

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'postgres'
    }
);

class Comment extends Model {}
Comment.init({
    name: DataTypes.STRING,
    title: DataTypes.TEXT,
    subtitle: DataTypes.TEXT
}, {sequelize});


app.get('/', (req, res) => {
    res.status(419).json({
        ok: true,
        me: 'teapot'
    });
});

const getComments = async () => {
    const comments = await Comment.findAll({});
    let p = comments.map(({name, title, subtitle, createdAt}) => ({
        name,
        title: `${title} &nbsp; <span class="grey--text text--lighten-1"> ${new Date(createdAt).toLocaleTimeString()}</span>`,
        subtitle
    }));
    p.push({ header: 'Recent comments'});
    return p.reverse();
}

const addComment = async (data) => {
    const name = data.name;
    const title = data.title;
    const subtitle = data.subtitle;

    await Comment.create({
        name, title, subtitle
    });

    return true;
}

const deleteComment = async (data) => {
    await Comment.destroy({
        where: {},
        truncate: true
    });

    return true;
}

app.use((err, req, res, next) => {
    res.status(500).send('500ISE T_T');
});



(async () => {
    await sequelize.sync();
    const port = parseInt(process.env.PORT || '3008');
    server.listen(port);
    io.on('connection', async (socket) => {

        socket.on('disconnect', () => {
            console.log('User exited')
        });

        socket.on('comments/add', async (data) => {
            if(await addComment(data)) io.emit('comments', await getComments())
        });

        socket.on('comments/delete', async (data) => {
           if(await deleteComment(data)) io.emit('comments', await getComments())
        });

        console.log('User entered')
        socket.emit('comments', await getComments())
    })

    console.log("Backend listening from " + port);
})();


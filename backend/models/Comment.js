const { Model, DataTypes } = require('sequelize');
const sequelize = require('../utils/sequelize');
const escape = require('../utils/escape.js');

class Comment extends Model { }
const interleave = (arr, thing) => [].concat(...arr.map(n => [n, thing])).slice(0, -1)

Comment.init({
    name: DataTypes.STRING,
    title: DataTypes.TEXT,
    subtitle: DataTypes.TEXT
}, { sequelize });

Comment.handlers = {
    addComment: async (data, name_by_auth) => {
        const title = data.title;
        const subtitle = data.subtitle;

        await Comment.create({
            name: name_by_auth, title, subtitle
        });

        return true;
    },

    deleteComment: async (data, name_by_auth) => {
        const where = {
            where: {
                id: comment.id
            }
        }
        await Comment.destroy({ where })
            .catch(err => {
                console.log(err);
            });

        return true;
    },

    getComments: async () => {
        const comments = await Comment.findAll({});
        let p = comments.map(({ id, name, title, subtitle, createdAt }) => ({
            id,
            name: escape(name),
            title: escape(title),
            subtitle: escape(subtitle),
            info: new Date(createdAt).toLocaleTimeString() + "&nbsp;·&nbsp;" + escape(name)
        }));
        p = interleave(p, { divider: true, inset: true });
        p.push({ header: 'Recent comments' });
        return p.reverse();
    }
}

module.exports = Comment;

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../utils/sequelize');

class User extends Model { }
const interleave = (arr, thing) => [].concat(...arr.map(n => [n, thing])).slice(0, -1)

User.init({
    sparcs_id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    github_id: DataTypes.STRING,
    commits: DataTypes.INTEGER,
    prs: DataTypes.INTEGER,
    reviews: DataTypes.INTEGER,
    games: DataTypes.INTEGER,
    repos: DataTypes.STRING,
}, { sequelize });

user_utils = {
    getUser: users => users.map((userObj) => {
        return {
            sparcs_id: userObj.sparcs_id,
            github_id: userObj.github_id,
            commits: userObj.commits,
            prs: userObj.prs,
            reviews: userObj.reviews,
            games: userObj.games,
            total_pt: userObj.commits + userObj.prs + userObj.reviews + userObj.games,
            degree: "뉴비" // TODO
        }
    })

}

User.handlers = {
    addUser: async (sparcs_id, github_id) => {
        let commits = 0 // TODO
        let prs = Math.floor(Math.random() * 1000) // TODO
        let reviews = 0 // TODO
        let repos = ["Ara"] // TODO

        await User.create({
            sparcs_id,
            github_id,
            commits,
            prs,
            reviews,
            repos: JSON.stringify(repos),
            games: 0
        })
    },
    updateUser: async (sparcs_id, update_obj) => {
        await User.update(update_obj, { where: { sparcs_id } })
    },
    getUser: async (sparcs_id) => {
        return await User.findOne({ where: { sparcs_id } })
    },
    deleteUser: async (sparcs_id) => {
        return await User.destroy({ where: { sparcs_id } })
    },
    getUserBySort: async () => {
        let data = user_utils.getUser(await User.findAll({}))
        data.sort((a, b) => b.total_pt - a.total_pt)
        return data
    },
    deleteAll: async () => {
        await User.destroy({ where: {}, truncate: true })
    }
}


module.exports = User;
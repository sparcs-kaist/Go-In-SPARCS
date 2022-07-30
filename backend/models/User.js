const { Model, DataTypes } = require('sequelize');
const sequelize = require('../utils/sequelize');

class User extends Model { }
const interleave = (arr, thing) => [].concat(...arr.map(n => [n, thing])).slice(0, -1)

User.init({
    sparcs_id: DataTypes.STRING,
    github_id: DataTypes.STRING,
    commits: DataTypes.INTEGER,
    prs: DataTypes.INTEGER,
    reviews: DataTypes.INTEGER,
    total_pt: DataTypes.INTEGER,
    degree: DataTypes.STRING,
    repos: DataTypes.STRING,
}, { sequelize });

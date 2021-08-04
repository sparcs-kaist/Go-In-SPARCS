const {getComments} = require('../models/Comment').handlers

module.exports = async (req, res) => {
    res.json(await getComments());
}

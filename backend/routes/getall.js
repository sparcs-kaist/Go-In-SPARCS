const userHandler = require('../models/user').handlers

module.exports = async (req, res) => {
    res.json({
        users: await userHandler.getUserBySort(),
        ok: true,
    })
}

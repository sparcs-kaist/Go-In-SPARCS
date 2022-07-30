const userHandler = require('../models/user').handlers

module.exports = async (req, res) => {
    const sparcs_id = req.user_id[0]
    console.log(sparcs_id, req.param('github_id'))
    if (!await userHandler.getUser(sparcs_id)) {
        await userHandler.addUser(sparcs_id, req.param('github_id'))
    }
    res.json({
        ok: true,
    })
}

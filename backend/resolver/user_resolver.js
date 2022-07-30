const userHandler = require('../models/user').handlers

module.exports = {
    users: async () => await userHandler.getUserBySort(),
    update_games: async (sparcs_id, update_obj) => await userHandler.updateUser(sparcs_id, update_obj)
}

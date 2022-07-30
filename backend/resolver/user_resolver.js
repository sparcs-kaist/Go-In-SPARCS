const userHandler = require('../models/user').handlers

module.exports = {
    users: async () => await userHandler.getUserBySort(),
    update_games: async ({ sparcs_id, score }) => {
        let user = await userHandler.getUser(sparcs_id)
        await userHandler.updateUser(sparcs_id, { games: user.games + score })
        user = await userHandler.getUser(sparcs_id)
        return user.games
    }
}

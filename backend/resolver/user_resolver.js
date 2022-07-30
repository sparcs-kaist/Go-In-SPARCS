const userHandler = require('../models/user').handlers

module.exports = {
    users: async () => await userHandler.getUserBySort(),
}

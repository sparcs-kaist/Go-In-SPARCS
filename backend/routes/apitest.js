const userHandler = require('../models/user').handlers


module.exports = async (req, res) => {
    await userHandler.deleteAll()
    await userHandler.addUser("aaa", "gaaa")
    await userHandler.addUser("bbb", "gbbb")
    await userHandler.updateUser("bbb", { github_id: "gbbbmodify" })
    await userHandler.addUser("ccc", "gccc")
    await userHandler.deleteUser("ccc")
    const d = await userHandler.getUser("bbb")
    await userHandler.getUser("ddd") // null
    console.log(d.sparcs_id, d.github_id)
    console.log(await userHandler.getUserBySort())
    res.json("ok");
}

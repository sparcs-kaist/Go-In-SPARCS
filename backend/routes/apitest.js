const userHandler = require('../models/user').handlers

const members = ["kjy2844", "injoonH", "withSang", "dora-sparcs", "JeukHwang"]

module.exports = async (req, res) => {
    // await userHandler.deleteAll()
    // for (let m of members) {
    //     await userHandler.addUser(`${m}`, `${m}`)
    // }
    
    // await userHandler.addUser("sboh1214", "sboh1214")
    // await userHandler.addUser("sboh1214", "sboh1214")
    // await userHandler.addUser("sboh1214", "sboh1214")
    // await userHandler.addUser("sboh1214", "sboh1214")
    // await userHandler.addUser("sboh1214", "sboh1214")
    // await userHandler.addUser("sboh1214", "sboh1214")
    // await userHandler.addUser("sboh1214", "sboh1214")
    // await userHandler.addUser("sboh1214", "sboh1214")
    // await userHandler.addUser("sboh1214", "sboh1214")
    // await userHandler.addUser("sboh1214", "sboh1214")
    // await userHandler.addUser("sboh1214", "sboh1214")
    // await userHandler.addUser("sboh1214", "sboh1214")
    // await userHandler.addUser("TriangleYJ", "TriangleYJ")
    // await userHandler.updateUser("TriangleYJ", { github_id: "TriangleYJmodify" })
    // await userHandler.addUser("ddungiii", "ddungiii")
    // await userHandler.deleteUser("ddungiii")
    // const d = await userHandler.getUser("sboh1214")
    // await userHandler.getUser("ddungiii") // null
    // console.log(d.sparcs_id, d.github_id)
    console.log(await userHandler.getUserBySort())
    res.json("ok");
}

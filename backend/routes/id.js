module.exports = (req, res) => {
    res.json({
        ok: true,
        id: req.user_id
    })
}

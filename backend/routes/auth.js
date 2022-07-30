const { exec } = require('child_process');
const jwt = require('jsonwebtoken');
const secret = require('../utils/secret')
const { authenticate } = require('ldap-authentication')
const userHandler = require('../models/user').handlers

function escape(str) {
    return str
        .replace(/\\/gi, '\\\\')
        .replace(/"/gi, '\\"')
        .replace(/\$/gi, '\\$');
}

module.exports = async (req, res) => {
    let { id, password } = req.body;
    id = escape(id);
    password = escape(password);

    try {
        let authenticated = await authenticate({
            ldapOpts: { url: 'ldap://' + process.env.SPARCS_LDAP_HOST },
            userDn: `uid=${id},ou=People,dc=sparcs,dc=org`,
            userPassword: password,
        })

        const me = await userHandler.getUser(id)
        const github_id = me ? me.github_id : null


        const payload = { id: [id, github_id], type: 'auth' };
        const token = await new Promise(resolve => {
            jwt.sign(payload, secret, { expiresIn: "6h" }, (err, token) => {
                if (err) {
                    resolve(null);
                    return;
                }
                resolve(token);
            });
        });

        res.json({
            ok: true,
            token
        });

    } catch (e) {
        res.status(403).json({
            ok: false,
            reason: 'no-such-user-or-wrong-password'
        });
    }
}

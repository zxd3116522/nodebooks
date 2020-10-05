const db = require('../mysql/db')

const bc = require('bcryptjs')

const jwt = require('jsonwebtoken')

const config = require('../config')

exports.userReg = (req, res) => {
    const userinfo = req.body;
    if (!userinfo.username || !userinfo.password) return res.cc('用户名或密码不能为空')
    const sql = `select * from ev_users where username=?`
    db.query(sql, userinfo.username, (err, results) => {
        if (err) return res.cc(err)
        if (results.length > 0) return res.cc('用户名被占用!')
        userinfo.password = bc.hashSync(userinfo.password, 10)
        const sql = `insert into ev_users set ?`
        db.query(sql, { username: userinfo.username, password: userinfo.password }, (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('注册用户失败!')
            res.cc('注册用户成功', 0)
        })
    })
}

exports.userLogin = (req, res) => {
    const userinfo = req.body;
    const sql = `select * from ev_users where username=?`
    db.query(sql, userinfo.username, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('该用户没有注册,请先注册!')
        const compareResult = bc.compareSync(userinfo.password, results[0].password)
        if (!compareResult) return res.cc('登录失败,密码输入错误!')
        const user = {...results[0], password: '', user_pic: '' }
        const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: '24h' })
        res.send({
            status: 0,
            message: '登录成功!',
            token: 'Bearer ' + tokenStr,
        })
    })
}
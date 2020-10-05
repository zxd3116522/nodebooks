const db = require('../mysql/db')

exports.getArticleCate = (req, res) => {
    const sql = `select * from ev_article_cate where is_delete=0 order by id`;
    db.query(sql, (err, results) => {
        if (err) res.cc(err)
        res.send({
            status: 0,
            message: '获取文章分类成功!',
            data: results,
        })
    })

}
exports.addArticleCate = (req, res) => {
    const sql = `select * from ev_article_cate where name=? or alias=?`
    db.query(sql, [req.body.name, req.body.alias], (err, results) => {
        if (err) return res.cc(err)
        if (results.length == 2) return res.cc('分类与别名都被占用')
        if (results.length == 1 && results[0].name == req.body.name && results[0].alias == req.body.alias) return res.cc('分类与别名都被占用')
        if (results.length == 1 && results[0].name == req.body.name) return res.cc('分类名被占用!')
        if (results.length == 1 && results[0].alias == req.body.alias) return res.cc('分类名被占用!')
        const sql = `insert into ev_article_cate set?`
        db.query(sql, req.body, (err, results) => {
            if (err) res.cc(err)
            res.cc('新增文章分类成功', 0)
        })
    })
}
exports.deleteArticleCate = (req, res) => {
    const sql = `update ev_article_cate set is_delete=1 where id=?`
    db.query(sql, req.params.id, (err, results) => {
        if (err) res.cc(err)
        if (results.affectedRows !== 1) res.cc('删除文章分类失败!')
        res.cc('删除文章分类成功!', 0)
    })
}
exports.getArticleCateById = (req, res) => {
    const sql = `select * from ev_article_cate where id=?`
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('获取文章分类失败')
        res.send({
            status: 0,
            message: '获取文章分类成功',
            data: results[0],
        })
    })
}
exports.updateArticleCateById = (req, res) => {
    const sql = `select * from ev_article_cate where id<>? and (name=? or alias=?)`
    db.query(sql, [req.body.id, req.body.name, req.body.alias], (err, results) => {
        if (err) res.cc(err)
        if (results.length === 2) return res.cc('分类名与别名都被占用!')
        if (results.length == 1 && results[0].name == req.body.name && results[0].alias == req.body.alias) return res.cc('分类与别名都被占用')
        if (results.length == 1 && results[0].name == req.body.name) return res.cc('分类名被占用!')
        if (results.length == 1 && results[0].alias == req.body.alias) return res.cc('分类名被占用!')
        const sql = `update ev_article_cate set ? where id=?`
        db.query(sql, [req.body, req.body.id], (err, results) => {
            if (err) res.cc(err);
            if (results.affectedRows !== 1) return res.cc('更新分类失败')
            res.cc('更新分类成功', 0)
        })
    })
}
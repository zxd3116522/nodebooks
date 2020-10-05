const db = require('../mysql/db')
const path = require('path')
const expressJoi = require('@escook/express-joi')
exports.addArticle = (req, res) => {
    if (!req.file || req.file.fieldname !== 'cover_img') return res.cc('文章封面必选!')

    const articleinfo = {
        ...req.body,
        cover_img: path.join('/uploads', req.file.filename),
        pub_date: new Date(),
        author_id: req.user.id,
    }
    const sql = `insert into ev_articles set ?`
    db.query(sql, articleinfo, (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('发布文章失败!')
        res.cc('发布文章成功', 0)
    })
}
exports.getArticleList = (req, res) => {
    const sql = `select * from ev_articles limit ${(req.query.pagenum - 1)*req.query.pagesize},${req.query.pagesize}`;
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '查询文章列表成功!',
            data: results,
        })
    })
}
exports.deleteArticle = (req, res) => {
    const sql = `update ev_articles set is_delete=1 where id=?`
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('删除文章失败!')
        res.cc('删除文章成功', 0);
    })
}
exports.getArticleListById = (req, res) => {
    const sql = `select * from ev_articles where id=?`
    db.query(sql, req.params.id, (err, results) => {
        if (err) res.cc(err)
        res.send({
            status: 0,
            message: '获取文章成功!',
            data: results[0],
        })
    })
}
exports.editArticle = (req, res) => {
    if (!req.file || req.file.fieldname !== 'cover_img') return res.cc('必须要添加图片');
    const　 editArticleInfo = {
        ...req.body,
        cover_img: path.join('/uploads', req.file.filename),
    }
    const sql = `update ev_articles set ? where id=?`
    db.query(sql, [editArticleInfo, req.body.id], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('更新文章失败!')
        res.cc('更新文章成功', 0)
    })
}
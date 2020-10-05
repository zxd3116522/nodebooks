const express = require('express')
const expressJoi = require('@escook/express-joi')
const router = express.Router();
const multer = require('multer')
const path = require('path')
const { addArticle, getArticleList, deleteArticle, getArticleListById, editArticle } = require('../router_handler/articles')
const { add_article_schema, get_list_schema, delete_article_schema, edit_article_schema } = require('../schema/articles')
const uploads = multer({ dest: path.join(__dirname, '../uploads') })
router.post('/add', uploads.single('cover_img'), expressJoi(add_article_schema), addArticle)
router.get('/list', expressJoi(get_list_schema), getArticleList)
router.get('/delete/:id', expressJoi(delete_article_schema), deleteArticle)
router.get('/:id', expressJoi(delete_article_schema), getArticleListById)
router.post('/edit', uploads.single('cover_img'), expressJoi(edit_article_schema), editArticle)
module.exports = router
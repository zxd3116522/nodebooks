const joi = require('@hapi/joi')
const title = joi.string().required()
const cate_id = joi.number().integer().min(1).required();
const content = joi.string().required().allow('')
const state = joi.string().valid('已发布', '草稿').required();
const pagenum = joi.number().integer().min(1).required();
const pagesize = joi.number().integer().min(1).required();
const cate_id1 = joi.number().integer().min(1);
const state1 = joi.string().valid('已发布', '草稿');
const id = joi.number().integer().min(1).required();
exports.add_article_schema = {
    body: {
        title,
        cate_id,
        content,
        state,
    }
}
exports.get_list_schema = {
    query: {
        pagenum,
        pagesize,
        cate_id: cate_id1,
        state: state1,
    }
}
exports.delete_article_schema = {

    params: {
        id
    }

}
exports.edit_article_schema = {
    body: {
        title,
        cate_id,
        content,
        state,
        id,
    }
}
const joi = require('@hapi/joi')
const username = joi.string().alphanum().min(1).max(10).required();
const password = joi.string().pattern(/^[\S]{6,12}$/).required();
const id = joi.number().integer().min(1).required();
const nickname = joi.string().required();
const email = joi.string().email().required();
const avatar = joi.string().dataUri().required();
exports.reg_log_schema = {
    body: {
        username,
        password
    }
}
exports.updata_user_info = {
    body: {
        id,
        nickname,
        email
    }
}
exports.updata_user_pwd = {
    body: {
        oldPwd: password,
        newPwd: joi.not(joi.ref('oldPwd')).concat(password)
    }
}
exports.updata_user_avatar = {
    body: {
        avatar
    }
}
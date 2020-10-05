const express = require('express');
const expressJoi = require('@escook/express-joi')
const router = express.Router()
const { getUserInfo, updataUserInfo, updataUserPwd, updataUserAvatar } = require('../router_handler/userinfo')
const { updata_user_info, updata_user_pwd, updata_user_avatar } = require('../schema/user');
const { required } = require('@hapi/joi');

router.get('/userinfo', getUserInfo)

router.post('/userinfo', expressJoi(updata_user_info), updataUserInfo)

router.post('/updataPwd', expressJoi(updata_user_pwd), updataUserPwd)

router.post('/updata/avatar', expressJoi(updata_user_avatar), updataUserAvatar)

module.exports = router
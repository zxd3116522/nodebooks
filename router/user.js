const express = require('express');

const expressJoi = require('@escook/express-joi');

const { reg_log_schema } = require('../schema/user')

const router = express.Router()

const { userReg, userLogin } = require('../router_handler/user')

router.post('/reguser', expressJoi(reg_log_schema), userReg)

router.post('/login', expressJoi(reg_log_schema), userLogin)

module.exports = router;
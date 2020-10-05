//导入express实例
const express = require('express');
const app = express();
//导入解决跨域cors
const cors = require('cors')

//导入路由模块

const userRouter = require('./router/user')

const userinfoRouter = require('./router/userinfo')

const articleRouter = require('./router/article')

const articlesRouter = require('./router/articles')

//导入joi
const joi = require('@hapi/joi')

//导入解析token的中间件

const expressJwt = require('express-jwt')

const config = require('./config')

//注册跨域中间件

app.use(cors());



//注册解析表单格式中间件

app.use(express.urlencoded({ extended: false }));
app.use(express.static('./uploads'))

app.use(expressJwt({ secret: config.jwtSecretKey }).unless({ path: [/^\/api/] }))

//注册响应数据的中间件

app.use((req, res, next) => {
    res.cc = (err, status = 1) => {
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next()
})

app.use('/api', userRouter)

app.use('/my', userinfoRouter)

app.use('/my/article', articleRouter)
app.use('/my/article', articlesRouter)
app.use((err, req, res, next) => {
    if (err instanceof joi.ValidationError) return res.cc(err)
    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败!')
    res.cc(err)
})

//运行80端口服务器
app.listen(80, () => {
    console.log('running');
})
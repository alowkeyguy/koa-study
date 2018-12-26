const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
// 格式化json，使其符合标准
const json = require('koa-json')
const onerror = require('koa-onerror')
// 处理post请求的body
const body = require('koa-body')
const logger = require('koa-logger')
const koajwt = require('koa-jwt')
const {SIGN} = require('./config/secret')
const authorithError = require('./middleware/authority-error')

const article = require('./routes/article')
const user = require('./routes/user')

// error handler
onerror(app)

app.use(authorithError())
// jwt异常
// app.use(function (ctx, next) {

//   return next().catch(err => {
//     if (err.status) {
//       ctx.status = 401
//       ctx.body = {
//         code: 401,
//         msg: '无效token'
//       }
//     }
//   })
// })
// 接口过滤，验证白名单
app.use(koajwt({secret: SIGN}).unless({
  path: [
    // 登入
    /^\/users\/login/,
    /^\/users\/register/
  ]
}))

// middlewares
app.use(body())
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

// app.use(views(__dirname + '/views', {
//   extension: 'pug'
// }))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(article.routes(), article.allowedMethods())
app.use(user.routes(), user.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app

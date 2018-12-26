const jwt = require('jsonwebtoken')
const {SIGN} = require('../config/secret')

/**
 * 判断token是否可用
 */
// module.exports = async function (ctx, next) {
//   try {
//     const token = ctx.header.authorization
    
//     if (token) {
//         const user = await jwt.verify(token.split(' ')[1], SIGN)  // 解密token
//         ctx.user = {
//             username: user.username,
//             id: user.id
//         }
//     }
//     next()
//   } catch (error) {
//     ctx.body = {
//       code: 401,
//       msg: '权限验证出错',
//       error
//     }
//   }
// }
module.exports = function () {
  return async function (ctx, next) {
      try {
          const token = ctx.header.authorization
          if (token) {
              let payload
              try {
                  payload = await jwt.verify(token.split(' ')[1], SIGN)  // 解密payload，获取用户名和ID
                  ctx.user = {
                      username: payload.username,
                      id: payload.id
                  }
              } catch (err) {

                  err.status = 401;
                  ctx.body = {
                    code: 401,
                    msg: 'Token verify fail'
                  }
              }
          }
          await next()
      } catch (err) {
        // if (err.code === 401) {
        //   ctx.status = 401;
        //   ctx.body = {
        //     code: 401,
        //     msg: 'Unauthorized，请求需要用户的身份认证！'
        //   }
        // }
        console.log(err)
        ctx.body = err
      }
  }
}


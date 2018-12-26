const User = require('../database/user')
const jwt = require('jsonwebtoken')
const {SIGN} = require('../config/secret')

module.exports = {
  /**
   * 注册用户
   * @method {post}
   */
  register: async ctx => {
    let {username, password} = ctx.request.body
    if (!username || !password) {
      ctx.body = {
        code: 501,
        msg: '用户名或密码不能为空'
      }
      return false
    }
    // [找到/创建的对象, 是否创建了对象] = findOrCreated
    const [user, created] = await User.findOrCreate(username, {password})

    if (created) {
      ctx.body = {
        code: 0,
        msg: '注册成功'
      }
    } else {
      ctx.body = {
        code: 201,
        msg: '该用户名已被注册'
      }
    }
  },
  
  /**
   * 用户登录
   * @method {post}
   */
  login: async ctx => {
    let {username, password} = ctx.request.body

    if (!username || !password) {
      ctx.body = {
        code: 501,
        msg: '用户名或密码不能为空'
      }
      return false
    }

    const user = await User.findUserByUserInfo({username})

    if (user === null) {
      ctx.body = {
        code: 502,
        msg: '用户不存在'
      }
      return false
    }
    // 校验密码
    if (user.password !== password) {
      ctx.body = {
        code: 503,
        msg: '密码错误'
      }
      return false
    }
    const userToken = {id: user.id, username: user.username}
    const token = jwt.sign(userToken, SIGN, {expiresIn: '6h'})
    ctx.body = {
      code: 0,
      msg: '登入成功',
      token: 'Bearer ' + token
    }
  },

  /**
   * 删除用户
   * @method {delete}
   */
  deleteUser: async ctx => {
    let id = ctx.params.id

    User.deleteUserByUserId(id)

    ctx.body = {
      code: 0,
      msg: '删除成功'
    }
  },
  
  /**
   * 获取用户列表
   * @method {get}
   */
  userList: async ctx => {
    let {pageIndex = 1, pageSize = 12} = ctx.request.search

    const {count, rows} = await User.findUserListByPage(pageIndex, pageSize)

    ctx.body = {
      code: 0,
      msg: '成功',
      result: rows,
      totalCount: count
    }
  },

  /**
   * 获取用户信息
   * @method {get}
   */
  userInfo: async ctx => {
    const info = await User.findUserByUserInfo({id: ctx.user.id})

    ctx.body = {
      code: 0,
      msg: '成功',
      result: info
    }
  }
}
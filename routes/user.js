const router = require('koa-router')()
const {register, userList, login, deleteUser, userInfo} = require('../controllers/user.js')

router.prefix('/users')

// 注册
router.post('/register', register)
// 登录
router.post('/login', login)
// 获取用户列表
router.get('/list', userList)
// 删除用户
router.delete('/delete/:id', deleteUser)
// 获取用户信息
router.get('/info', userInfo)

module.exports = router

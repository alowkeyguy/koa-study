const sequelize = require('../lib/sequelize')

// https://demopark.github.io/sequelize-docs-Zh-CN/models-definition.html
// sequelize.import()--会将sequelize实例和DataTypes注入到user.js中
const User = sequelize.import('../models/user')

module.exports = {
  /**
   * 查询或创建
   * @param {string} username
   * @param {object} defaults 如果没查到，将要随username一起存入数据库的数据
   */
  findOrCreate: async (username, defaults) => await User.findOrCreate({
    where: {username},
    defaults
  }),

  /**
   * 根据用户唯一值查询用户
   * @param {object} info ({id} || {username})
   */
  findUserByUserInfo: async info => await User.findOne({
    where: info
  }),

  /**
   * 分页查询用户列表
   * @param {number} pageIndex
   * @param {number} pageSize
   */
  findUserListByPage: async (pageIndex, pageSize) => await User.findAndCountAll({
    offset: (pageIndex -1) * pageSize,
    limit: pageSize
  }),

  /**
   * 删除用户
   * @param {number} id
   */
  deleteUserByUserId: async id => await User.destroy({
    where: {id}
  })
}
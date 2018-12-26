/**
 * 文章模型
 */
const moment = require('moment');
// const sequelize = require('../lib/sequelize.js')
// // 用户
// const User = sequelize.import('./user.js')


module.exports = (sequelize, DataTypes) => {

  return sequelize.define('article', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    // 谁写的
    user_id: {
      type: DataTypes.INTEGER
    },
    // 文章类型
    type: {
      type: DataTypes.INTEGER
    },
    // title
    title: {
      type: DataTypes.STRING
    },
    content: {
      type: DataTypes.STRING
    },
    createdAt: {
      type: DataTypes.DATE,
      get() {
          return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD');
      }
    },
    updatedAt: {
        type: DataTypes.DATE,
        get() {
            return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD');
        }
    }
  }, {
    freezeTableName: true
  })

}

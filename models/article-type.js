/**
 * 文章类型模型
 */
const moment = require('moment');
const sequelize = require('../lib/sequelize.js')
// 文章
const Article = sequelize.import('./article.js')

module.exports = (sequelize, DataTypes) => {

  return sequelize.define('article_type', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      // references: {
      //   model: Article,
      //   key: 'type'
      // }
    },
    name: {
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

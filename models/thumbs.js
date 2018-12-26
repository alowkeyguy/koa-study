/**
 * 点赞
 */
const moment = require('moment');
module.exports = (sequelize, DataTypes) => {

  return sequelize.define('thumbs', {
    // 谁点的赞
    user_id: {
      type: DataTypes.INTEGER
    },
    // 顶赞的文章
    article_id: {
      type: DataTypes.INTEGER
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
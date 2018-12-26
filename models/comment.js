const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
 return sequelize.define('comment', {
    // 哪篇文章的评论
    article_id: {
      type: DataTypes.INTEGER,
    },
    // 评论内容
    comment: {
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
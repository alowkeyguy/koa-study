const moment = require('moment');

module.exports = (sequelize, DataTypes) => {

  return sequelize.define('follow', {
    // follow谁
    user_id: {
      type: DataTypes.INTEGER
    },
  }, {
    freezeTableName: true
  })

}
const Sequelize = require('sequelize');
const config = require('./config');

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: { //  连接池设置
        max: 5, //  最大连接数
        min: 0, //  最小连接数
        idle: 30000
    }
});

module.exports = sequelize
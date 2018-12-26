/**
 * 初始化表
 */
const sequelize = require('./sequelize.js')

// 用户
const User = sequelize.import('../models/user.js')
// 文章
const Article = sequelize.import('../models/article')
// 类型
const ArticleType = sequelize.import('../models/article-type')
// 评论
// const Comment = sequelize.import('../models/comment')
// // 关注
// const Follow = sequelize.import('../models/follow')
// 点赞
// const Thumbs = sequelize.import('../models/thumbs')




User.sync({force: true})
Article.sync({force: true})
ArticleType.sync({force: true})
// Comment.sync({force: true})
// Follow.sync({force: true})
// Thumbs.sync({force: true})

// 设置关联--无限制地执行外键引用
// Article.hasOne(User)
// ArticleType.hasMany(Article)
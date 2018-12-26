const sequelize = require('../lib/sequelize')
const Article = sequelize.import('../models/article')
const ArticleType = sequelize.import('../models/article-type')
Article.hasOne(ArticleType, {foreignKey: 'id', sourceKey: 'type'})

module.exports = {

  //==================article===================//

  /**
   * 创建文章
   * @param {object} article
   */
  createArticle: async article => await Article.create(article),

  // /**
  //  * 查询某人的文章列表
  //  * @param {object} condition 比如{user_id: 1, type: 1}
  //  * @param {number} pageIndex
  //  * @param {number} pageSize
  //  */
  // findArticleList: async (pageIndex, pageSize, condition = {}) => await Article.findAndCountAll({
  //   where: condition,
  //   offset: (pageIndex -1) * pageSize,
  //   limit: pageSize
  // }),

  /**
   * 根据文章类型获取文章列表
   * @param {number} type 文章类型id
   */
  findArticleListBytype: async (pageIndex, pageSize, type) => {
    let condition = {}
    if (type) {
      condition = {type}
    }
    return await Article.findAndCountAll({
      where: condition,
      offset: (pageIndex -1) * pageSize,
      limit: pageSize,
      include: {
        model: ArticleType
      }
    })
  },

  /**
   * 查询文章详情
   * @param {number} id 文章id
   */
  findArticleDetail: async id => await Article.findOne({where: {id}}),

  /**
   * 删除文章
   * @param {number} id 文章id
   */
  deleteArticle: async id => await Article.destroy({
    where: {id}
  }),

  /**
   * 更新文章
   * @param {number} id 文章id
   * @param {number} type
   * @param {string} content 文章内容
   * @param {string} title
   */
  updateArticle: async ({id, type, content, title}) => await Article.update({
    type,
    content,
    title
  },
  {
    where: {id}
  }),

  //=======================articleType=====================//
  
  /**
   * 创建文章类型
   * @param {string} name 类型名称
   */
  findOrCreateArticleType: async name => await ArticleType.findOrCreate({
    where: {name}
  }),
  
  /**
   * 获取全部文章分类
   */
  findArticleType: async _ => await ArticleType.findAll(),

  /**
   * 删除文章分类
   * @param {number} type 类型id
   */
  deleteArticleType: async type => await ArticleType.destroy({
    where: {id: type}
  }),

  /**
   * 编辑文章分类
   * @param {number} id 类型id
   */
  updateArticleType: async ({id, name}) => await ArticleType.update({
    name
  },
  {
    where: {id}
  })
}
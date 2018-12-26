const Article = require('../database/article')

module.exports = {

  //===========分类=============//
  
  /**
   * 创建分类
   */
  createArticleType: async ctx => {
    let name = ctx.request.body.name
    if (!name) {
      ctx.body = {
        code: 501,
        msg: '文章分类名不能为空'
      }
      return false
    }
    const [obj, result] = await Article.findOrCreateArticleType(name)

    if (result) {
      ctx.body = {
        code: 0,
        msg: '创建成功'
      }
    } else {
      ctx.body = {
        code: 502,
        msg: '该分类已存在'
      }
    }
  },

  /**
   * 更新分类
   */
  updateArticleType: async ctx => {
    const {id, name} = ctx.request.body
    await Article.updateArticleType({id, name})

    ctx.body = {
      code: 0,
      msg: '成功'
    }
  },

  /**
   * 获取分类
   */
  getArticleType: async ctx => {
    const arr = await Article.findArticleType()
    ctx.body = {
      code: 0,
      msg: '成功',
      result: arr
    }
  },

  /**
   * 删除分类
   */
  deleteArticleType: async ctx => {
    const type = ctx.params.id
    const res = await Article.deleteArticleType(type)
    ctx.body = {
      code: 0,
      msg: '成功'
    }
  },

  //============文章============//

  /**
   * 新增文章
   */
  createArticle: async ctx => {
    const {type, title, content} = ctx.request.body
    if (!type || !title || !content) {
      ctx.body = {
        code: 202,
        msg: '参数不全'
      }
      return false
    }
    await Article.createArticle({type, title, content, user_id: ctx.user.id})

    ctx.body = {
      code: 0,
      msg: '成功'
    }
  },

  /**
   * 删除文章
   */
  deleteArticle: async ctx => {
    const id = ctx.params.id
    await Article.deleteArticle(id)

    ctx.body = {
      code: 0,
      msg: '删除成功'
    }
  },

  /**
   * 获取文章详情
   */
  articleDetail: async ctx => {
    const id = ctx.params.id
    const res = await Article.findArticleDetail(id)
    ctx.body = {
      code: 0,
      msg: '成功',
      result: res
    }
  },

  /**
   * 更新文章
   */
  updateArticle: async ctx => {
    const {id, type, title, content} = ctx.request.body
    if (!id || !type || !title || !content) {
      ctx.body = {
        code: 202,
        msg: '参数不全'
      }
      return false
    }
    await Article.updateArticle({id, type, content, title})

    ctx.body = {
      code: 0,
      msg: '成功'
    }
  },

  /**
   * 获取文章列表
   */
  articleList: async ctx => {
    const {pageIndex, pageSize, type} = ctx.request.query
    console.log(ctx.request.query)

    const {count, rows} = await Article.findArticleListBytype(+pageIndex, +pageSize, type)

    ctx.body = {
      code: 0,
      msg: '成功',
      result: rows,
      totalCount: count
    }
  }
}

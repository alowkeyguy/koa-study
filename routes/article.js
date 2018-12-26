const router = require('koa-router')()
const Article = require('../controllers/article')

//==============分类================//

// 新增分类
router.post('/articleType/add', Article.createArticleType)
// 更新分类
router.put('/articleType/update', Article.updateArticleType)
// 删除分类
router.delete('/articleType/delete/:id', Article.deleteArticleType)
// 获取分类
router.get('/articleType/list', Article.getArticleType)

//==============文章===============//

// 新增文章
router.post('/article/add', Article.createArticle)
// 删除文章
router.delete('/article/delete/:id', Article.deleteArticle)
// 获取文章详情
router.get('/article/detail/:id', Article.articleDetail)
// 跟新文章
router.put('/article/update', Article.updateArticle)
// 获取文章列表
router.get('/article/list', Article.articleList)

module.exports = router

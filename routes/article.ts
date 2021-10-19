const articleRouter = require('express').Router();

const articleControllers = require('../controllers/article')

articleRouter.get('/list', articleControllers.getArticles)

module.exports = articleRouter
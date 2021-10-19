const articleSql = require('../mysql');

const getArticleModel = () => {
    const sql = `SELECT a.user_id, a.user_name,a.content,a.avatar FROM article a LEFT JOIN user u ON a.user_id = u.id`;
    return articleSql.connect('user', sql)
}

module.exports = {
    getArticleModel
}
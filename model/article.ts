const articleSql = require('../mysql');


/**
 * 联表查询语句 
 * SELECT * FROM article a (将article赋予别名) LEFT JOIN(连接副表) user u ON(主副表关系) a.user_id = u.id
 * 
 * @returns 
 */
const getArticleModel = () => {
    const sql = `SELECT a.user_id, a.user_name,a.content,a.avatar FROM article a LEFT JOIN user u ON a.user_id = u.id`;
    return articleSql.connect('user', sql)
}

module.exports = {
    getArticleModel
}
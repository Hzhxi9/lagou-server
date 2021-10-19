const getArticleModels = require('../model/article');

const getArticles = async (req: any, res: any, next: any) => {
    try {
        const result = await getArticleModels.getArticleModel()
        res.render('success', {
            data: JSON.stringify(result)
        })
    } catch (error) {
        console.log(error, '==error')
        res.render('fail', {
            data: error
        })
    }
}

module.exports = {
    getArticles
}
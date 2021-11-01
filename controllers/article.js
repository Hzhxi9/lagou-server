const { getArticleModel } = require('../model/article');

const getArticles = async (req, res, next) => {
  try {
    const result = await getArticleModel();
    res.render('success', {
      data: JSON.stringify(result),
    });
  } catch (error) {
    res.render('fail', {
      data: error,
    });
  }
};

module.exports = {
  getArticles,
};
